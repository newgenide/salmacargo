import Package from "@/models/package";
import { connectDb } from "@/utils";
import { NextRequest, NextResponse } from "next/server";


interface params{
    tracking: string
}

export async function GET(req:NextRequest,res:NextResponse, {params}:{params: params}){
    try{
        await connectDb();
        const packageItem = await Package.findOne({trackingID: params.tracking});
        if(packageItem){
            return NextResponse.json({packageItem});
        }
        return NextResponse.json({message: 'package not found'}, {status: 404});
    }catch(error:any){
        console.log(error);
        return NextResponse.json({
            message: 'Internal server error'
        }, {status: 500});
    }
}

export async function PUT(req:NextRequest,res:NextResponse, {params}:{params: params}){
    try{
        await connectDb();
        const packageItem = await Package.findOne({trackingID: params.tracking});
        const {
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
        } = await req.json();
        
        if(packageItem){
            packageItem.trackingID = trackingID;
            packageItem.senderName = senderName;
            packageItem.senderEmail = senderEmail;
            packageItem.senderPhone = senderPhone;
            packageItem.originAddress = originAddress;
            packageItem.receiverName = receiverName;
            packageItem.receiverEmail = receiverEmail;
            packageItem.receiverPhone = receiverPhone;
            packageItem.destinationAddress = destinationAddress;
            packageItem.expectedDeliveryDate = expectedDeliveryDate;
            packageItem.weight = weight;
            packageItem.freight = freight;
            packageItem.charges = charges;
            packageItem.description = description;
            packageItem.status = status;
            await packageItem.save();
            return NextResponse.json({packageItem});
        }
        return NextResponse.json({message: 'package not found'}, {status: 404});
    }catch(error:any){
        console.log(error);
        return NextResponse.json({
            message: 'Internal server error'
        }, {status: 500});
    }
}

export async function DELETE(req:NextRequest,res:NextResponse){
    try{
        const {tracking} = await req.json();
        await connectDb();
        const packageItem = await Package.findOne({trackingID: tracking});
        if(packageItem){
            await packageItem.remove();
            return NextResponse.json({message: 'package deleted successfully'});
        }
        return NextResponse.json({message: 'package not found'}, {status: 404});
    }catch(error:any){
        console.log(error);
        return NextResponse.json({
            message: 'Internal server error'
        }, {status: 500});
    }
}
