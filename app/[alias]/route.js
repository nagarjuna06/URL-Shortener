import linkModel from "@/lib/linkModel";
import connectDB from "@/lib/mongodb";
import { NextResponse } from "next/server";

export const GET = async (req, { params: { alias } }) => {
  try {
    await connectDB();

    const data = await linkModel.findOne({ alias });

    if (data) return NextResponse.redirect(data.link);
    else return NextResponse.redirect(`${req.nextUrl.origin}/not-found`);
  } catch (error) {
    return NextResponse.json({ msg: error.message }, { status: 500 });
  }
};
