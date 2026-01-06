export default function StatusBadge({ status }) {
  const base = 'px-3 py-1 rounded-full text-xs font-medium transition-colors'

  // Define colors based on your palette
  const styles = {
    // Opportunity Status
    Pending: 'bg-[#FFF0E6] text-[#000000] border border-[#FF4F00]',      // Light orange background → black text
    Approved: 'bg-[#FF4F00] text-[#FFFFFF]',                             // Orange background → white text
    Rejected: 'bg-[#333333] text-[#FFFFFF]',                             // Charcoal background → white text
    
    // Position Status
    Closed: 'bg-[#333333] text-[#FFFFFF]',                               // Charcoal background → white text
    Open: 'bg-[#FF4F00] text-[#FFFFFF]',                                 // Orange background → white text
    Paused: 'bg-[#FFFFFF] text-[#000000] border border-[#333333]',       // White background → black text with charcoal border
    
    // Additional statuses for completeness
    Verified: 'bg-[#333333] text-[#FFFFFF]',                             // Charcoal background → white text
    Denied: 'bg-[#FFF0E6] text-[#000000] border border-[#FF4F00]',       // Light orange background → black text
    Draft: 'bg-[#FFFFFF] text-[#000000] border border-[#333333]',        // White background → black text with charcoal border
    Archived: 'bg-[#333333] text-[#FFFFFF]',                             // Charcoal background → white text
    Active: 'bg-[#FF4F00] text-[#FFFFFF]',                               // Orange background → white text
    Inactive: 'bg-[#333333] text-[#FFFFFF]',                             // Charcoal background → white text
  }

  return (
    <span className={`${base} ${styles[status] || 'bg-[#FFFFFF] text-[#000000] border border-[#333333]'}`}>
      {status}
    </span>
  )
}