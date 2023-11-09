import linkModel from "@/lib/linkModel";
import connectDB from "@/lib/mongodb";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    await connectDB();
    const body = await req.json();
    body.expires = parseInt(body.expires);
    if (body.pin) body.pin = parseInt(body.pin);
    if (body.expires == 0) delete body.expires;
    if (!body.alias) delete body.alias;

    let data = null;
    if (body.expires) {
      data = await linkModel.create({
        ...body,
        expireAt: new Date(Date.now() + body.expires + 60 * 60 * 1000),
      });
    } else {
      data = await linkModel.create(body);
    }
    return NextResponse.json({
      long: data.link,
      short: `${req.nextUrl.origin}/${data.alias}`,
    });
  } catch (error) {
    if (error.code === 11000 && error.keyPattern && error.keyPattern.alias) {
      return NextResponse.json(
        { msg: "Alias is not available." },
        { status: 409 }
      );
    }
    return NextResponse.json({ msg: error.message }, { status: 500 });
  }
};

export const PUT = async (req) => {
  try {
    await connectDB();

    const body = await req.json();
    body.pin = parseInt(body.pin);
    const data = await linkModel.findOne({ alias: body.alias });
    if (data) {
      if (body.pin === data.pin) {
        await linkModel.updateOne({ alias: body.alias }, body);
        return NextResponse.json({
          long: body.link,
          short: `${req.nextUrl.origin}/${body.alias}`,
        });
      } else {
        return NextResponse.json(
          { pin: { msg: "Incorrect PIN ", invalid: true } },
          { status: 400 }
        );
      }
    } else {
      return NextResponse.json(
        { alias: { invalid: true, msg: "Invalid alias name" } },
        { status: 404 }
      );
    }
  } catch (error) {
    return NextResponse.json({ msg: error.message }, { status: 500 });
  }
};
