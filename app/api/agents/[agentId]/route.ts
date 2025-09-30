import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

interface RouteParams {
  params: Promise<{
    agentId: string
  }>
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { agentId } = await params
    
    const { data: agent, error } = await supabase
      .from('agents')
      .select('*')
      .eq('id', agentId)
      .eq('is_active', true)
      .single()
    
    if (error || !agent) {
      return NextResponse.json({ error: 'Agent not found' }, { status: 404 })
    }
    
    return NextResponse.json(agent)
  } catch (error) {
    console.error('Error fetching agent:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { agentId } = await params
    const body = await request.json()
    
    const { data: agent, error } = await supabase
      .from('agents')
      // @ts-expect-error - Supabase type issue with update method
      .update(body)
      .eq('id', agentId)
      .select()
      .single()
    
    if (error) {
      throw error
    }
    
    return NextResponse.json(agent)
  } catch (error) {
    console.error('Error updating agent:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { agentId } = await params
    
    const { error } = await supabase
      .from('agents')
      .delete()
      .eq('id', agentId)
    
    if (error) {
      throw error
    }
    
    return NextResponse.json({ message: 'Agent deleted successfully' })
  } catch (error) {
    console.error('Error deleting agent:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
