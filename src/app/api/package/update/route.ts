import { connectDb, geocodeAddress } from "@/utils";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import Package from "@/models/package";
import ShipmentHistory from "@/models/history";
import { sendEmail } from "@/utils/sendEmail";

export async function PUT(req: NextRequest) {
    try {
        // Verify admin session
        const session = await getServerSession();
        if (!session) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const {
            trackingID,
            status,
            currentLocation,
            notes
        } = await req.json();

        // Validate required fields
        if (!trackingID || !status || !currentLocation) {
            return NextResponse.json({ 
                message: 'Tracking ID, status, and current location are required' 
            }, { status: 400 });
        }

        // Validate status
        const validStatuses = ['pending', 'processing', 'in transit', 'delivered', 'cancelled'];
        if (!validStatuses.includes(status)) {
            return NextResponse.json({ 
                message: 'Invalid status value' 
            }, { status: 400 });
        }

        await connectDb();

        // Find and update package
        const package_ = await Package.findOne({ trackingID });
        if (!package_) {
            return NextResponse.json({ 
                message: 'Package not found' 
            }, { status: 404 });
        }

        // Update package status and location
        package_.status = status;
        package_.currentLocation = currentLocation;
        await package_.save();

        const geocode = await geocodeAddress(currentLocation);
        if(!geocode){
          return NextResponse.json({ message: 'Invalid address' }, { status: 400 });
        }

        // Create history entry
        const history = await ShipmentHistory.create({
            trackingID,
            status,
            currentLocation,
            currentCoords: geocode,
            notes: notes || `Package ${status} at ${currentLocation}`
        });

        // send email notification for transit, delivered and cancelled
        // check if transit is already created to avoid mutiple duplicates
        if (status.toLowerCase() == 'in transit') {
            await sendEmail({
                email: package_.email,
                name: package_.name,
                type: 'shipped',
                trackingNumber: package_.trackingID
            });
        }
        
        if (status.toLowerCase() == 'delivered') {
            await sendEmail({
                email: package_.email,
                name: package_.name,
                type: 'arrived',
                trackingNumber: package_.trackingID
            });
        }

        if (status.toLowerCase() == 'cancelled') {
            await sendEmail({
                email: package_.email,
                name: package_.name,
                type: 'cancelled',
                trackingNumber: package_.trackingID
            });
        }

        return NextResponse.json({
            message: 'Package updated successfully',
            package: package_,
            history: history
        });
    } catch (error) {
        console.error('Error updating package:', error);
        return NextResponse.json({ 
            message: 'Internal server error' 
        }, { status: 500 });
    }
}
