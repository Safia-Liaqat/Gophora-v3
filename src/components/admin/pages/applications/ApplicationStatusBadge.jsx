export default function ApplicationStatusBadge({ status }) {
  const styles = {
    Pending: 'bg-[#FFF0E6] text-[#FF4F00]',
    Shortlisted: 'bg-[#E6FFE6] text-black',
    Rejected: 'bg-[#333333] text-white',
  }

  return (
    <span
      className={`px-2 py-1 text-xs rounded font-medium ${styles[status]}`}
    >
      {status}
    </span>
  )
}
