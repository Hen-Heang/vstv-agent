'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu'
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Edit, Trash2, MoreHorizontal } from 'lucide-react'
import { toast } from 'sonner'
import AgentForm from './agent-form'

interface Agent {
  id: string
  name: string
  position: string
  email: string
  phone: string
  telegram: string
  avatar_url: string
  bio: string
  experience_years: number
  specialties: string[]
  languages: string[]
  properties_sold: number
  rating: number
  education?: string
  certifications?: string[]
  achievements?: string[]
  location?: string
}

interface AgentDetailActionsProps {
  agent: Agent
}

export default function AgentDetailActions({ agent }: AgentDetailActionsProps) {
  const router = useRouter()
  const [showEditForm, setShowEditForm] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleEdit = () => {
    setShowEditForm(true)
  }

  const handleEditSuccess = () => {
    setShowEditForm(false)
    toast.success('Agent updated successfully!')
    router.refresh()
  }

  const handleEditCancel = () => {
    setShowEditForm(false)
  }

  const handleDelete = async () => {
    setIsDeleting(true)
    
    try {
      const response = await fetch(`/api/agents/${agent.id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        toast.success('Agent deleted successfully!')
        // Force a hard navigation to ensure fresh data
        window.location.href = '/agents'
      } else {
        const error = await response.json()
        toast.error(error.message || 'Failed to delete agent')
      }
    } catch (error) {
      console.error('Error deleting agent:', error)
      toast.error('Failed to delete agent')
    } finally {
      setIsDeleting(false)
      setShowDeleteDialog(false)
    }
  }

  if (showEditForm) {
    return (
      <AgentForm
        agent={agent}
        onSuccess={handleEditSuccess}
        onCancel={handleEditCancel}
      />
    )
  }

  return (
    <>
      <div className="flex justify-end mb-6">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <MoreHorizontal className="h-4 w-4 mr-2" />
              Actions
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={handleEdit}>
              <Edit className="h-4 w-4 mr-2" />
              Edit Agent
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => setShowDeleteDialog(true)}
              className="text-red-600"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Agent
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Agent</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete <strong>{agent.name}</strong>? 
              This action cannot be undone. The agent will be marked as inactive.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700"
            >
              {isDeleting ? 'Deleting...' : 'Delete Agent'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
