'use client'

import Image from 'next/image'
import Link from 'next/link'
import Head from 'next/head'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Phone, MessageCircle, Mail, MapPin, Search, Filter, SortAsc, SortDesc } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import type { Agent, SupabaseAgent } from '@/types/agent'
import { useEffect, useState, useMemo } from 'react'



export default function AgentsPage() {
  const [agents, setAgents] = useState<Agent[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('position')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const [filterSpecialty, setFilterSpecialty] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [agentsPerPage] = useState(6)

  const fetchAgents = async () => {
    try {
      console.log('🔄 Fetching agents...')
      setIsLoading(true)
      
      if (!supabase) {
        console.error('Supabase client not configured. Please set up environment variables.')
        setAgents([])
        setIsLoading(false)
        return
      }

      // Add timestamp to force fresh data
      const timestamp = Date.now()
      console.log(`🕐 Fetching agents at ${new Date(timestamp).toLocaleTimeString()}`)
      
      const { data: agentsData, error } = await supabase
        .from('agents')
        .select('*')
        .eq('is_active', true)
        .order('id', { ascending: true })
      
      console.log('📊 Agents data:', agentsData)
      console.log('❌ Error:', error)
      
      if (error) {
        console.error('Error fetching agents:', error)
        setAgents([])
        setIsLoading(false)
        return
      }

      if (agentsData && agentsData.length > 0) {
        console.log(`✅ Found ${agentsData.length} active agents`)
        // Transform data to match frontend expectations
        const transformedAgents: Agent[] = agentsData.map((agent: SupabaseAgent) => ({
          id: agent.id,
          name: agent.name,
          email: agent.email,
          phone: agent.phone || '',
          telegram: agent.telegram || '',
          position: agent.position || '',
          bio: agent.bio || '',
          avatar_url: agent.avatar_url || '',
          background_image: agent.background_image || '/images/company/VSTV-BG.png',
          specialties: agent.specialties || [],
          languages: agent.languages || [],
          experience_years: agent.experience_years || 0,
          properties_sold: agent.properties_sold || 0,
          rating: agent.rating || 0,
          education: agent.education || '',
          certifications: agent.certifications || [],
          achievements: agent.achievements || [],
          location: agent.location || 'Phnom Penh',
          is_active: agent.is_active,
          created_at: agent.created_at,
          updated_at: agent.updated_at
        }))
        setAgents(transformedAgents)
      } else {
        console.log('❌ No agents found in database')
        setAgents([])
      }
    } catch (error) {
      console.error('Error fetching agents:', error)
      setAgents([])
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchAgents()
  }, [])

  // Refetch agents when the page becomes visible (e.g., after navigation)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        console.log('👁️ Page became visible, refreshing agents...')
        fetchAgents()
      }
    }

    const handleFocus = () => {
      console.log('🎯 Window focused, refreshing agents...')
      fetchAgents()
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    window.addEventListener('focus', handleFocus)
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      window.removeEventListener('focus', handleFocus)
    }
  }, [])

  // Manual refresh function
  const handleRefresh = () => {
    console.log('🔄 Manual refresh triggered')
    fetchAgents()
  }

  // Get unique specialties for filter
  const allSpecialties = useMemo(() => {
    try {
      const specialties = new Set<string>()
      if (Array.isArray(agents)) {
        agents.forEach(agent => {
          if (agent && agent.specialties && Array.isArray(agent.specialties)) {
            agent.specialties.forEach(specialty => {
              if (typeof specialty === 'string') {
                specialties.add(specialty)
              }
            })
          }
        })
      }
      return Array.from(specialties).sort()
    } catch (error) {
      console.error('Error processing specialties:', error)
      return []
    }
  }, [agents])

  // Filter and sort agents
  const filteredAndSortedAgents = useMemo(() => {
    try {
      if (!Array.isArray(agents)) return []
      
      const filtered = agents.filter(agent => {
        if (!agent || !agent.name || !agent.position || !agent.bio) return false
        
        const matchesSearch = agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            agent.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            agent.bio.toLowerCase().includes(searchTerm.toLowerCase())
        
        const matchesSpecialty = !filterSpecialty || (agent.specialties && agent.specialties.includes(filterSpecialty))
        
        return matchesSearch && matchesSpecialty
      })

    // Sort agents
    filtered.sort((a, b) => {
      if (!a || !b) return 0
      
      let comparison = 0
      
      switch (sortBy) {
        case 'position':
          const positionOrder = {
            'Real Estate Agent Manager': 1,
            'Real Estate Agent Supervisor': 2,
            'Senior Real Estate Agent': 3,
            'Real Estate Agent': 4
          }
          const aOrder = positionOrder[a.position as keyof typeof positionOrder] || 5
          const bOrder = positionOrder[b.position as keyof typeof positionOrder] || 5
          comparison = aOrder - bOrder
          break
        case 'rating':
          comparison = (a.rating || 0) - (b.rating || 0)
          break
        case 'experience':
          comparison = (a.experience_years || 0) - (b.experience_years || 0)
          break
        case 'properties':
          comparison = (a.properties_sold || 0) - (b.properties_sold || 0)
          break
        case 'name':
          comparison = (a.name || '').localeCompare(b.name || '')
          break
        default:
          comparison = 0
      }
      
      return sortOrder === 'asc' ? comparison : -comparison
    })

      return filtered
    } catch (error) {
      console.error('Error filtering and sorting agents:', error)
      return []
    }
  }, [agents, searchTerm, sortBy, sortOrder, filterSpecialty])

  // Pagination logic
  const totalPages = Math.ceil(filteredAndSortedAgents.length / agentsPerPage)
  const startIndex = (currentPage - 1) * agentsPerPage
  const endIndex = startIndex + agentsPerPage
  const paginatedAgents = filteredAndSortedAgents.slice(startIndex, endIndex)

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, sortBy, sortOrder, filterSpecialty])
  return (
    <>
      <Head>
        <title>Our Agents - VSTV Agent</title>
        <meta name="description" content="Meet our experienced real estate agents who can help you find your perfect property in Cambodia" />
      </Head>
      <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Our Agents
            </h1>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              Meet our experienced real estate professionals who are here to help you
            </p>
            <div className="mt-6">
              <Button 
                onClick={handleRefresh}
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <Search className="h-4 w-4" />
                Refresh Agents
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        {/* Search and Filter Section */}
        <div className="mb-8 bg-white rounded-lg shadow-sm p-4 sm:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search agents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            {/* Sort By */}
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-400 flex-shrink-0" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
              >
                <option value="position">Sort by Position</option>
                <option value="rating">Sort by Rating</option>
                <option value="experience">Sort by Experience</option>
                <option value="properties">Sort by Properties Sold</option>
                <option value="name">Sort by Name</option>
              </select>
            </div>
            
            {/* Sort Order */}
            <Button
              variant="outline"
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="flex items-center space-x-2 text-sm sm:text-base"
            >
              {sortOrder === 'asc' ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />}
              <span className="hidden sm:inline">{sortOrder === 'asc' ? 'Ascending' : 'Descending'}</span>
              <span className="sm:hidden">{sortOrder === 'asc' ? 'Asc' : 'Desc'}</span>
            </Button>
            
            {/* Specialty Filter */}
            <select
              value={filterSpecialty}
              onChange={(e) => setFilterSpecialty(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
            >
              <option value="">All Specialties</option>
              {allSpecialties.map(specialty => (
                <option key={specialty} value={specialty}>{specialty}</option>
              ))}
            </select>
          </div>
          
          {/* Results Count */}
          <div className="mt-4 text-sm text-gray-600">
            Showing {startIndex + 1}-{Math.min(endIndex, filteredAndSortedAgents.length)} of {filteredAndSortedAgents.length} agents
            {searchTerm && ` matching "${searchTerm}"`}
            {filterSpecialty && ` in ${filterSpecialty}`}
            {totalPages > 1 && ` (Page ${currentPage} of ${totalPages})`}
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <Card key={index} className="overflow-hidden bg-white border-0 shadow-lg">
                <div className="relative h-48 bg-gray-200 animate-pulse"></div>
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-1">
                      <div className="h-4 w-4 bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-4 w-4 bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-4 w-4 bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-4 w-4 bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-4 w-4 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                    <div className="text-right">
                      <div className="h-6 w-12 bg-gray-200 rounded animate-pulse mb-1"></div>
                      <div className="h-3 w-16 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                  </div>
                  <div className="space-y-2 mb-4">
                    <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4">
                    <div className="text-center p-2 sm:p-3 bg-gray-100 rounded-lg">
                      <div className="h-6 w-8 bg-gray-200 rounded animate-pulse mx-auto mb-1"></div>
                      <div className="h-3 w-16 bg-gray-200 rounded animate-pulse mx-auto"></div>
                    </div>
                    <div className="text-center p-2 sm:p-3 bg-gray-100 rounded-lg">
                      <div className="h-4 w-4 bg-gray-200 rounded animate-pulse mx-auto mb-1"></div>
                      <div className="h-3 w-16 bg-gray-200 rounded animate-pulse mx-auto"></div>
                    </div>
                  </div>
                  <div className="space-y-2 mb-4">
                    <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                    <div className="flex flex-wrap gap-1">
                      <div className="h-6 w-16 bg-gray-200 rounded-full animate-pulse"></div>
                      <div className="h-6 w-20 bg-gray-200 rounded-full animate-pulse"></div>
                      <div className="h-6 w-14 bg-gray-200 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                    <div className="grid grid-cols-3 gap-1 sm:gap-2">
                      <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Agents Grid */}
        {!isLoading && (
          <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {paginatedAgents.map((agent) => (
            <Card key={agent.id} className="group overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-white border-0 shadow-lg hover:border-blue-200">
              {/* Agent Image Header */}
              <div 
                className="relative h-48 bg-cover bg-center bg-no-repeat overflow-hidden"
                style={{
                  backgroundImage: `url('${agent.background_image || '/images/company/VSTV-BG.png'}')`,
                }}
              >
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-all duration-500"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center space-x-3">
                    <div className="relative group-hover:scale-110 transition-transform duration-300">
                      <Image
                        src={agent.avatar_url}
                        alt={agent.name}
                        width={60}
                        height={60}
                        className="rounded-full object-cover border-4 border-white shadow-lg group-hover:shadow-xl transition-all duration-300"
                        loading="lazy"
                        placeholder="blur"
                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                      />
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white group-hover:bg-green-400 transition-colors duration-300"></div>
                    </div>
                    <div className="flex-1 text-white">
                      <h3 className="font-bold text-lg group-hover:text-blue-100 transition-colors duration-300">{agent.name}</h3>
                      <p className="text-blue-100 text-sm group-hover:text-blue-200 transition-colors duration-300">{agent.position}</p>
                    </div>
                  </div>
                </div>
              </div>

              <CardContent className="p-4 sm:p-6">
                {/* Rating and Stats */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(agent.rating) ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="ml-2 text-sm font-medium text-gray-600">{agent.rating}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-600">{agent.properties_sold}</div>
                    <div className="text-xs text-gray-500">Properties Sold</div>
                  </div>
                </div>
                
                {/* Bio */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{agent.bio}</p>
                
                {/* Experience and Location */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4">
                  <div className="text-center p-2 sm:p-3 bg-gray-50 rounded-lg">
                    <div className="text-xl sm:text-2xl font-bold text-blue-600">{agent.experience_years}</div>
                    <div className="text-xs text-gray-500">Years Experience</div>
                  </div>
                  <div className="text-center p-2 sm:p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-center text-blue-600 mb-1">
                      <MapPin className="h-3 w-3 sm:h-4 sm:w-4" />
                    </div>
                    <div className="text-xs text-gray-500">Phnom Penh</div>
                  </div>
                </div>
                
                {/* Specialties */}
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2 text-sm">Specialties</h4>
                  <div className="flex flex-wrap gap-1">
                    {agent.specialties && agent.specialties.slice(0, 3).map((specialty, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full"
                      >
                        {specialty}
                      </span>
                    ))}
                    {agent.specialties && agent.specialties.length > 3 && (
                      <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
                        +{agent.specialties.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="space-y-2">
                  <Button asChild className="w-full bg-blue-600 hover:bg-blue-700 group-hover:bg-blue-700 transition-all duration-300 hover:scale-105 text-sm sm:text-base">
                    <Link href={`/agents/${agent.id}`} className="flex items-center justify-center">
                      View Full Profile
                    </Link>
                  </Button>
                  <div className="grid grid-cols-3 gap-1 sm:gap-2">
                    <Button variant="outline" size="sm" asChild className="hover:bg-blue-50 hover:border-blue-300 hover:scale-105 transition-all duration-300 p-2">
                      <a href={`tel:${agent.phone}`} className="flex items-center justify-center">
                        <Phone className="h-3 w-3 sm:h-4 sm:w-4" />
                      </a>
                    </Button>
                    <Button variant="outline" size="sm" asChild className="hover:bg-blue-50 hover:border-blue-300 hover:scale-105 transition-all duration-300 p-2">
                      <a href={`https://t.me/${agent.telegram}`} className="flex items-center justify-center">
                        <MessageCircle className="h-3 w-3 sm:h-4 sm:w-4" />
                      </a>
                    </Button>
                    <Button variant="outline" size="sm" asChild className="hover:bg-blue-50 hover:border-blue-300 hover:scale-105 transition-all duration-300 p-2">
                      <a href={`mailto:${agent.email}`} className="flex items-center justify-center">
                        <Mail className="h-3 w-3 sm:h-4 sm:w-4" />
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            ))}
          </div>
        )}

        {/* Pagination */}
        {!isLoading && totalPages > 1 && (
          <div className="mt-8 sm:mt-12 flex justify-center">
            <div className="flex items-center space-x-1 sm:space-x-2">
              <Button
                variant="outline"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="hover:bg-blue-50 text-sm px-3 py-2"
              >
                <span className="hidden sm:inline">Previous</span>
                <span className="sm:hidden">Prev</span>
              </Button>
              
              <div className="flex items-center space-x-1">
                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                  let page;
                  if (totalPages <= 5) {
                    page = i + 1;
                  } else if (currentPage <= 3) {
                    page = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    page = totalPages - 4 + i;
                  } else {
                    page = currentPage - 2 + i;
                  }
                  return (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      onClick={() => setCurrentPage(page)}
                      className={`w-8 h-8 sm:w-10 sm:h-10 text-sm ${
                        currentPage === page 
                          ? 'bg-blue-600 text-white' 
                          : 'hover:bg-blue-50'
                      }`}
                    >
                      {page}
                    </Button>
                  );
                })}
              </div>
              
              <Button
                variant="outline"
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="hover:bg-blue-50 text-sm px-3 py-2"
              >
                <span className="hidden sm:inline">Next</span>
                <span className="sm:hidden">Next</span>
              </Button>
            </div>
          </div>
        )}

        {/* No Results */}
        {!isLoading && filteredAndSortedAgents.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg mb-4">No agents found</div>
            <p className="text-gray-400 mb-6">
              {searchTerm || filterSpecialty 
                ? 'Try adjusting your search criteria or filters'
                : 'No agents are currently available'
              }
            </p>
            {(searchTerm || filterSpecialty) && (
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm('')
                  setFilterSpecialty('')
                }}
              >
                Clear Filters
              </Button>
            )}
          </div>
        )}

        {/* Team Stats */}
        <div className="mt-24 bg-white rounded-2xl shadow-sm">
          <div className="px-6 py-16 sm:px-16 lg:px-24">
            <div className="mx-auto max-w-2xl text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Our Team by Numbers
              </h2>
              <p className="mt-4 text-lg leading-8 text-gray-600">
                Experience and results that speak for themselves
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 sm:gap-8 sm:grid-cols-2 lg:grid-cols-4">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">49+</div>
                <div className="text-sm text-gray-600">Years Combined Experience</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">905+</div>
                <div className="text-sm text-gray-600">Properties Sold</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">700+</div>
                <div className="text-sm text-gray-600">Happy Clients</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">4.8</div>
                <div className="text-sm text-gray-600">Average Rating</div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-24 bg-blue-600 rounded-2xl">
          <div className="px-6 py-16 sm:px-16 lg:px-24">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Ready to Work with Our Team?
              </h2>
              <p className="mt-4 text-lg leading-8 text-blue-100">
                Contact any of our agents today to start your property journey
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/contact">
                    Contact Us
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20" asChild>
                  <Link href="/properties">
                    Browse Properties
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  )
}

