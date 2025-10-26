export default function Board({ children }: { children?: React.ReactNode }) {
  return (
    <div className="board">
      <div className="content">
        {children}
      </div>
    </div>
  )
}