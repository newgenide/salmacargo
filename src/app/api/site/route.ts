import Site from "@/models/site";
import { connectDb } from "@/utils";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req:NextRequest, res:NextResponse){
    try{
        await connectDb();
        const site = await Site.findOne({}) || {};
        return NextResponse.json({site});
    }catch(error:any){
        console.log(error);
        return NextResponse.json({
            message: 'Internal server error'
        }, {status: 500})
    }
}

export async function POST(req:NextRequest, res:NextResponse){
    try{
        const {
            siteName,
            address,
            phone,
            email
        } = await req.json();
        await connectDb();
        await Site.findOneAndUpdate({siteName: siteName}, {
            siteName,
            address,
            phone,
            email
        }, {
            upsert: true,
            new: true
        });
        return NextResponse.json({message: 'site updated successfully'});
    }catch(error:any){
        console.log(error);
        return NextResponse.json({
            message: 'Internal server error'
        }, {status: 500})
    }
}