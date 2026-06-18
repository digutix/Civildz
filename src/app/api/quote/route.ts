import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

// Accepts a quote request from the website-services form and stores it.
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = String(body.name ?? '').trim();
    const email = String(body.email ?? '').trim();
    const message = String(body.message ?? '').trim();
    const serviceType = String(body.serviceType ?? '').trim();

    // Minimal server-side validation.
    if (!name || !email || !message || !serviceType) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }

    const quote = await prisma.quoteRequest.create({
      data: {
        name,
        email,
        message,
        serviceType,
        phone: body.phone ? String(body.phone).trim() : null,
        budget: body.budget ? String(body.budget).trim() : null,
      },
    });

    return NextResponse.json({ ok: true, id: quote.id }, { status: 201 });
  } catch (err) {
    console.error('Quote submission failed:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
