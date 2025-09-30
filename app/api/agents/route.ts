import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const agentId = searchParams.get('agentId')
    
    if (agentId) {
      // Get specific agent by id
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
    } else {
      // Get all active agents
      const { data: agents, error } = await supabase
        .from('agents')
        .select('*')
        .eq('is_active', true)
        .order('id', { ascending: true })
      
      if (error) {
        throw error
      }
      
      return NextResponse.json(agents || [])
    }
  } catch (error) {
    console.error('Error fetching agents:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const { data: agent, error } = await supabase
      .from('agents')
      .insert(body)
      .select()
      .single()
    
    if (error) {
      throw error
    }
    
    return NextResponse.json(agent, { status: 201 })
  } catch (error) {
    console.error('Error creating agent:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const agentId = searchParams.get('agentId')
    
    if (!agentId) {
      return NextResponse.json({ error: 'Agent ID is required' }, { status: 400 })
    }
    
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

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const agentId = searchParams.get('agentId')
    
    if (!agentId) {
      return NextResponse.json({ error: 'Agent ID is required' }, { status: 400 })
    }
    
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
