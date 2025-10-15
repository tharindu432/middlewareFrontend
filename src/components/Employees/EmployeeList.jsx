import { useEffect, useMemo, useState } from 'react';
import { api } from '../../services/api';
import { useToast } from '../Common/Toast';

const EmployeeList = ({ searchQuery = '' }) => {
  const toast = useToast();
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sortKey, setSortKey] = useState('name');
  const [sortDir, setSortDir] = useState('asc');

  useEffect(() => {
    const fetchEmployees = async () => {
      setLoading(true);
      try {
        const response = await api.getEmployees();
        const list = Array.isArray(response.data) ? response.data : (response.data?.items || []);
        setEmployees(list);
      } catch (error) {
        const msg = error?.response?.data?.message || 'Failed to load employees';
        toast.error(msg);
      } finally {
        setLoading(false);
      }
    };
    fetchEmployees();
  }, []);

  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    let rows = employees;
    if (q) {
      rows = rows.filter(e =>
        (e.name || `${e.firstName || ''} ${e.lastName || ''}`)
          .toLowerCase()
          .includes(q) ||
        (e.email || '').toLowerCase().includes(q) ||
        (e.role || '').toLowerCase().includes(q)
      );
    }
    rows = [...rows].sort((a, b) => {
      const av = (a[sortKey] ?? '').toString().toLowerCase();
      const bv = (b[sortKey] ?? '').toString().toLowerCase();
      if (av < bv) return sortDir === 'asc' ? -1 : 1;
      if (av > bv) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });
    return rows;
  }, [employees, searchQuery, sortKey, sortDir]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const pageStart = (currentPage - 1) * pageSize;
  const pageRows = filtered.slice(pageStart, pageStart + pageSize);

  const onSort = (key) => {
    if (sortKey === key) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-gray-900">Employees</h2>
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-600">
          {loading ? 'Loading…' : `Showing ${pageRows.length} of ${filtered.length}`}
        </div>
        <div className="flex items-center gap-2">
          <select
            className="input-field-light py-1 px-2"
            value={pageSize}
            onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1); }}
          >
            {[5,10,20,50].map(s => <option key={s} value={s}>{s} / page</option>)}
          </select>
          <div className="flex items-center gap-1">
            <button className="btn btn-outline px-2 py-1" disabled={currentPage===1} onClick={() => setPage(1)}>{'<<'}</button>
            <button className="btn btn-outline px-2 py-1" disabled={currentPage===1} onClick={() => setPage(p => Math.max(1, p-1))}>{'<'}</button>
            <span className="px-2 text-sm">Page {currentPage} / {totalPages}</span>
            <button className="btn btn-outline px-2 py-1" disabled={currentPage===totalPages} onClick={() => setPage(p => Math.min(totalPages, p+1))}>{'>'}</button>
            <button className="btn btn-outline px-2 py-1" disabled={currentPage===totalPages} onClick={() => setPage(totalPages)}>{'>>'}</button>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto rounded-xl border border-gray-200">
        <table className="table-clean">
          <thead>
            <tr>
              <th className="cursor-pointer" onClick={() => onSort('id')}>Employee ID {sortKey==='id' ? (sortDir==='asc'?'▲':'▼') : ''}</th>
              <th className="cursor-pointer" onClick={() => onSort('name')}>Name {sortKey==='name' ? (sortDir==='asc'?'▲':'▼') : ''}</th>
              <th className="cursor-pointer" onClick={() => onSort('email')}>Email {sortKey==='email' ? (sortDir==='asc'?'▲':'▼') : ''}</th>
              <th>Role</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {pageRows.map((employee) => {
              const displayName = employee.name || `${employee.firstName || ''} ${employee.lastName || ''}`.trim();
              const role = employee.role || employee.userRole || '-';
              const status = (employee.status || (employee.isActive ? 'Active' : 'Inactive') || 'Active');
              return (
                <tr key={employee.id} className="hover:bg-blue-50/50 transition-colors">
                  <td>
                    <span className="font-semibold text-blue-600">{employee.id}</span>
                  </td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                        {displayName?.charAt(0) || 'E'}
                      </div>
                      <span className="text-gray-900 font-medium">{displayName || '—'}</span>
                    </div>
                  </td>
                  <td className="text-gray-700">{employee.email || '—'}</td>
                  <td>
                    <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold">
                      {role}
                    </span>
                  </td>
                  <td>
                    <span className={status === 'Active' ? 'status-confirmed' : 'status-cancelled'}>
                      {status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeList;