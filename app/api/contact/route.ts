import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { fullName, phone, company, email, serviceCategory, subject, message } = body;

    // Validate mandatory fields
    if (!fullName || !phone || !subject || !message) {
      return NextResponse.json(
        {
          success: false,
          message: 'لطفاً تمامی فیلدهای الزامی (نام، شماره تماس، موضوع و متن پیام) را تکمیل نمایید.',
        },
        { status: 400 }
      );
    }

    // Generate unique tracking code
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const trackingId = `NAT-1404-${randomSuffix}`;

    // Here in production, this would send an SMS / Email notification or store in CRM
    // Console log for verifiable server-side execution
    console.log(`[Contact Submission] Tracking ID: ${trackingId}`, {
      fullName,
      phone,
      company: company || 'N/A',
      email: email || 'N/A',
      serviceCategory,
      subject,
      length: message.length,
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json(
      {
        success: true,
        trackingId,
        message: 'درخواست همکاری با موفقیت در سیستم ثبت گردید. همکاران فنی ما در اولین فرصت با شما تماس خواهند گرفت.',
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact API Error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'خطای سرور در پردازش درخواست. لطفاً مجدداً امتحان کنید.',
      },
      { status: 500 }
    );
  }
}
