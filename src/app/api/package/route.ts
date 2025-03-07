import ShipmentHistory from "@/models/history";
import Package from "@/models/package";
import { connectDb, generateTracking } from "@/utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest,res:NextResponse){
    try{
        await connectDb();
        const packages = await Package.find({});
        return NextResponse.json({packages});
    }catch(error){
        console.log(error);
        return NextResponse.json({
            message: 'Internal server error'
        }, {status: 500});
    }
}

export async function POST(req:NextRequest,res:NextResponse){
    try{
        const {
            senderName,
            senderEmail,
            senderPhone,
            originAddress,
            receiverName,
            receiverEmail,
            receiverPhone,
            destinationAddress,
            expectedDeliveryDate,
            weight,
            freight,
            charges,
            description,
            status
        } = await req.json();

        if(!senderName || !senderEmail || !senderPhone || !originAddress || !receiverName || !receiverEmail || !receiverPhone || !destinationAddress || !expectedDeliveryDate || !weight || !freight || !charges){
            return NextResponse.json({message: 'All fields are required'}, {status: 400});
        }
        await connectDb();
        const trackingID = await generateTracking();
        const newPackage = await Package.create({
            trackingID,
            senderName,
            senderEmail,
            senderPhone,
            originAddress,
            receiverName,
            receiverEmail,
            receiverPhone,
            destinationAddress,
            expectedDeliveryDate,
            weight,
            freight,
            charges,
            description,
            status
        });

        const newShipmentHistory = await ShipmentHistory.create({
            trackingID,
            status,
            currentLocation: originAddress,
            notes: ''
        });

        return NextResponse.json({newPackage, newShipmentHistory});
    }catch(error:any){
        console.log(error);
        return NextResponse.json({
            message: 'Internal server error'
        }, {status: 500});
    }
}

