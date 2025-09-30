import React from 'react'
import { Link, useNavigate, useSearch } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { fetchCharacters } from '../api.tsx'
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import './CharacterPage.css'

export const CharacterList: React.FC = () => {
  const search = useSearch({ from: '/characters' })
  const navigate = useNavigate()

  const currentPage = search.page ?? 1
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['characters', currentPage],
    queryFn: () => fetchCharacters(currentPage),
  })

  const goToNextPage = () => {
    navigate({ to: '/characters', search: { page: Number(currentPage) + 1 } })
    window.scrollTo(0, 0)
  }

  const goToPrevPage = () => {
    navigate({ to: '/characters', search: { page: Math.max(1, Number(currentPage) - 1) } })
    window.scrollTo(0, 0)
  }

  const columns = React.useMemo<ColumnDef<any>[]>(
    () => [
      {
        header: 'Avatar',
        accessorKey: 'image',
        cell: (info) => (
          <img
            src={info.getValue() as string}
            alt="avatar"
            className="avatar"
          />
        ),
      },
      { header: 'Name', accessorKey: 'name' },
      { header: 'Species', accessorKey: 'species' },
      { header: 'Status', accessorKey: 'status' },
      { header: 'Gender', accessorKey: 'gender' },
      {
        header: 'Details',
        id: 'details',
        cell: ({ row }) => (
          <Link
            to="/characters/$id"
            params={{ id: row.original.id.toString() }}
            className="view-link"
          >
            View
          </Link>
        ),
      },
    ],
    []
  )

  const dataMemo = React.useMemo(() => data?.results ?? [], [data])
  const table = useReactTable({ data: dataMemo, columns, getCoreRowModel: getCoreRowModel() })

  return (
    <div className="page-container">
      <div className="header">
        <h2 className="page-info">Showing Character of Page {currentPage}</h2>
        <button onClick={() => refetch()} className="btn secondary">🔄 Refresh</button>
      </div>

      {isLoading && <div className="status loading">Loading characters...</div>}
      {isError && <div className="status error">❌ Error loading characters.</div>}
     
      {!isLoading && !isError && (
        <div className="table-wrapper">
          <table className="character-table">
            <thead>
              {table.getHeaderGroups().map((hg) => (
                <tr key={hg.id}>
                  {hg.headers.map((h) => (
                    <th key={h.id}>
                      {h.isPlaceholder ? null : flexRender(h.column.columnDef.header, h.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      <div className="pagination">
        <button onClick={goToPrevPage} disabled={currentPage === 1} className="btn">
          ⬅ Previous
        </button>
        <span className="page-info">
          Page {currentPage} of {data?.info.pages ?? '...'}
        </span>
        <button onClick={goToNextPage} disabled={currentPage >= (data?.info.pages ?? 1)} className="btn">
          Next ➡
        </button>
      </div>
    </div>
  )
}
