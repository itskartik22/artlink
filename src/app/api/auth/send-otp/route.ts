import { NextResponse } from "next/server";
import { sendOTP } from "@/lib/aws-sns";
import { prisma } from "@/lib/db";


export async function POST(req: Request) {
  try {
    const { phone } = await req.json();

    if (!phone) {
      return NextResponse.json({ error: "Phone number is required" }, { status: 400 });
    }

    // Check if user exists
    const user = await prisma.user.findUnique({ where: { phone } });

    if (user) {
      return NextResponse.json({ error: "User already exist!" }, { status: 400 });
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000); // 5 mins expiry

    console.log("OTP:", otp); 

    // Save OTP in DB
    await prisma.user.update({
      where: { phone },
      data: { otp, otpExpiry },
    });

    // Send OTP via SMS
    await sendOTP(phone, otp);

    return NextResponse.json({ message: "OTP sent successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}



// import { NextResponse } from "next/server";
// import { sendOTP } from "@/lib/aws-sns";
// import { prisma } from "@/lib/db";
// import bcryptjs from "bcryptjs";


// export async function POST(req: Request) {
//   try {
//     const { phone, password } = await req.json();

//     if (!phone) {
//       return NextResponse.json({ error: "Phone number is required" }, { status: 400 });
//     }

//     // Check if user exists
//     const user = await prisma.user.findUnique({ where: { phone } });

//     if (!user) {
//       return NextResponse.json({ error: "User doesn't exist!" }, { status: 404 });
//     }

//     if (!user.password) {
//       return NextResponse.json({ error: "Try different method to login!" }, { status: 400 });
//     }


//     // Check if password is correct
//     const passwordMatch = await bcryptjs.compare(password, user.password);
//     if (!passwordMatch) {
//       return NextResponse.json({ error: "Invalid password" }, { status: 400 });
//     }
    
//     // Generate 6-digit OTP
//     const otp = Math.floor(100000 + Math.random() * 900000).toString();
//     const otpExpiry = new Date(Date.now() + 5 * 60 * 1000); // 5 mins expiry

//     console.log("OTP:", otp); 

//     // Save OTP in DB
//     await prisma.user.update({
//       where: { phone },
//       data: { otp, otpExpiry },
//     });

//     // Send OTP via SMS
//     await sendOTP(phone, otp);

//     return NextResponse.json({ message: "OTP sent successfully" });
//   } catch (error) {
//     return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
//   }
// }
