// Dynamic imports for client-side only
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let jsPDF: any = null
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let autoTable: any = null

// Load PDF libraries dynamically
const loadPDFLibraries = async () => {
  if (typeof window === 'undefined') return
  
  try {
    const jsPDFModule = await import('jspdf')
    const autoTableModule = await import('jspdf-autotable')
    
    // Get the default export
    jsPDF = jsPDFModule.default || jsPDFModule
    autoTable = autoTableModule.default || autoTableModule
  } catch (error) {
    console.error('Failed to load PDF libraries:', error)
    throw error
  }
}

interface Unit {
  id: string
  unitNo: string
  price: number
  roomType: string
  handleBy: string
  remarks?: string
  status: string
  createdAt: string
  updatedAt: string
}

export async function exportUnitsToPDF(units: Unit[], filename: string = 'units-export.pdf') {
  try {
    await loadPDFLibraries()
    
    if (!jsPDF) {
      console.error('PDF library not loaded')
      return
    }
  } catch (error) {
    console.error('Failed to load PDF libraries:', error)
    return
  }

  // Validate units array
  if (!Array.isArray(units)) {
    console.error('Units must be an array')
    return
  }

  if (units.length === 0) {
    console.error('No units to export')
    return
  }
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const doc = new (jsPDF as any)('landscape', 'mm', 'a4')
  
  // Add title
  doc.setFontSize(20)
  doc.setFont('helvetica', 'bold')
  doc.text('Unit Available With Owner', 14, 20)
  
  // Add company info
  doc.setFontSize(12)
  doc.setFont('helvetica', 'normal')
  doc.text('VSTV AGENT (CAMBODIA) CO., LTD', 14, 30)
  doc.text(`Generated on: ${new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })}`, 14, 36)
  
  // Prepare table data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const tableData: any[] = []
  for (let i = 0; i < units.length; i++) {
    const unit = units[i]
    tableData.push([
      i + 1,
      unit.unitNo,
      `$${Number(unit.price || 0).toFixed(2)}`,
      unit.roomType,
      unit.handleBy,
      unit.remarks || '-',
      unit.status.charAt(0).toUpperCase() + unit.status.slice(1)
    ])
  }

  // Add table
  if (!autoTable) {
    console.error('autoTable is not available')
    return
  }
  
  autoTable(doc, {
    head: [['No.', 'Unit No.', 'Price ($)', 'Room Type', 'Handle By', 'Remarks / Notes', 'Status']],
    body: tableData,
    startY: 45,
    styles: {
      fontSize: 8,
      cellPadding: 2,
    },
    headStyles: {
      fillColor: [41, 128, 185], // Blue color
      textColor: 255,
      fontStyle: 'bold',
    },
    alternateRowStyles: {
      fillColor: [245, 245, 245], // Light gray for alternate rows
    },
    columnStyles: {
      0: { cellWidth: 15 }, // No.
      1: { cellWidth: 35 }, // Unit No.
      2: { cellWidth: 25 }, // Price
      3: { cellWidth: 30 }, // Room Type
      4: { cellWidth: 25 }, // Handle By
      5: { cellWidth: 40 }, // Remarks
      6: { cellWidth: 20 }, // Status
    },
    didDrawPage: (data: { pageNumber: number }) => {
      // Add page numbers
      const pageCount = doc.getNumberOfPages()
      doc.setFontSize(8)
      doc.text(`Page ${data.pageNumber} of ${pageCount}`, 14, doc.internal.pageSize.height - 10)
    }
  })

  // Add footer with total count
  const finalY = (doc as { lastAutoTable?: { finalY: number } }).lastAutoTable?.finalY || 45
  doc.setFontSize(10)
  doc.setFont('helvetica', 'bold')
  doc.text(`Total Units: ${units.length}`, 14, finalY + 10)
  
  // Add summary by status
  const statusCounts = units.reduce((acc, unit) => {
    acc[unit.status] = (acc[unit.status] || 0) + 1
    return acc
  }, {} as Record<string, number>)
  
  let yPosition = finalY + 20
  doc.setFontSize(9)
  doc.setFont('helvetica', 'normal')
  doc.text('Summary by Status:', 14, yPosition)
  
  Object.entries(statusCounts).forEach(([status, count]) => {
    yPosition += 6
    doc.text(`${status.charAt(0).toUpperCase() + status.slice(1)}: ${count} units`, 20, yPosition)
  })

  // Save the PDF
  doc.save(filename)
}

export function exportUnitsToCSV(units: Unit[], filename: string = 'units-export.csv') {
  // Validate units array
  if (!Array.isArray(units)) {
    console.error('Units must be an array')
    return
  }

  if (units.length === 0) {
    console.error('No units to export')
    return
  }

  const headers = ['No.', 'Unit No.', 'Price ($)', 'Room Type', 'Handle By', 'Remarks / Notes', 'Status', 'Created At', 'Updated At']
  
  const csvData = units.map((unit, index) => [
    index + 1,
    unit.unitNo,
    Number(unit.price || 0).toFixed(2),
    unit.roomType,
    unit.handleBy,
    unit.remarks || '',
    unit.status,
    new Date(unit.createdAt).toLocaleDateString(),
    new Date(unit.updatedAt).toLocaleDateString()
  ])
  
  const csvContent = [
    headers.join(','),
    ...csvData.map(row => row.map(field => `"${field}"`).join(','))
  ].join('\n')
  
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)
  link.setAttribute('href', url)
  link.setAttribute('download', filename)
  link.style.visibility = 'hidden'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
