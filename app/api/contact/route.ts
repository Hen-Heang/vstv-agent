import { NextRequest, NextResponse } from 'next/server'
import { createContactInquiry } from '@/lib/static-store'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null)
    const name = typeof body?.name === 'string' ? body.name.trim() : ''
    const email = typeof body?.email === 'string' ? body.email.trim().toLowerCase() : ''
    const phone = typeof body?.phone === 'string' ? body.phone.trim() : ''
    const message = typeof body?.message === 'string' ? body.message.trim() : ''

    if (!name || !email || !phone || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const inquiry = createContactInquiry({ name, email, phone, message })

    return NextResponse.json({ ok: true, inquiryId: inquiry.id }, { status: 201 })
  } catch (error) {
    console.error('Error creating contact inquiry:', error)
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 })
  }
}

