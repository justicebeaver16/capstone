import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import {
  getAllVendorsThunk,
  deleteVendorThunk,
  selectAllVendors
} from '../../store/slices/vendorsSlice';
import NewVendorFormModal from '../NewVendorFormModal/NewVendorFormModal';
import './Vendors.css';

const Vendors = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sessionUser = useSelector((state) => state.session.user);
  const vendors = useSelector(selectAllVendors);
  const [showModal, setShowModal] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  const canEditVendors = ['edit', 'full'].includes(sessionUser?.planningPermissions);

  useEffect(() => {
    if (sessionUser) {
      dispatch(getAllVendorsThunk());
    }
  }, [dispatch, sessionUser]);

  const confirmDelete = async () => {
    try {
      await dispatch(deleteVendorThunk(deleteConfirmId));
      setDeleteSuccess('Vendor deleted successfully.');
    } catch (err) {
      setDeleteSuccess('Failed to delete vendor.');
    } finally {
      setDeleteConfirmId(null);
      setTimeout(() => setDeleteSuccess(null), 3000);
    }
  };

  const handleAddVendor = () => {
    setShowModal(true);
  };

  const handleEditVendor = (vendorId) => {
    navigate(`/vendors/${vendorId}/edit`);
  };

  if (!sessionUser) return <Navigate to="/login" replace />;

  return (
    <div className="vendors-container">
      <h1>Vendor Management</h1>
      <p>Track and manage all your vendors here. You can add, edit, or remove vendors as needed.</p>

      {deleteSuccess && (
        <p className={deleteSuccess.includes('successfully') ? 'success-message' : 'error-message'}>
          {deleteSuccess}
        </p>
      )}

      <div className="vendors-actions">
        {canEditVendors && (
          <button className="add-vendor-btn" onClick={handleAddVendor}>
            Add New Vendor
          </button>
        )}
      </div>

      {showModal && <NewVendorFormModal onClose={() => setShowModal(false)} />}

      {vendors.length > 0 ? (
        <div className="vendors-list">
          {vendors.map((vendor) => (
            <div key={vendor.id} className="vendor-card">
              <h3>
                {vendor.name}{' '}
                <span className="vendor-status">[{vendor.status}]</span>
              </h3>
              <p><strong>Category:</strong> {vendor.category}</p>
              <p><strong>Contact:</strong> {vendor.contactName || 'N/A'} – {vendor.contactEmail || 'No email'}</p>
              <p><strong>Phone:</strong> {vendor.contactPhone || 'N/A'}</p>
              <p><strong>Website:</strong> {
                vendor.website ? (
                  <a href={vendor.website} target="_blank" rel="noopener noreferrer">{vendor.website}</a>
                ) : 'N/A'}
              </p>
              <p><strong>Description:</strong> {vendor.description || 'No description'}</p>

              {vendor.VendorAttachments?.length > 0 && (
                <div className="vendor-attachments">
                  <h4>Attachments:</h4>
                  <ul>
                    {vendor.VendorAttachments.map((att) => (
                      <li key={att.id}>
                        <a href={att.fileUrl} target="_blank" rel="noopener noreferrer">
                          {att.name} ({att.type || 'file'})
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {canEditVendors && (
                <div className="vendor-actions">
                  <button
                    onClick={() => handleEditVendor(vendor.id)}
                    className="add-vendor-btn"
                    title="Edit Vendor"
                  >
                    Edit Vendor
                  </button>
                  <button
                    onClick={() => setDeleteConfirmId(vendor.id)}
                    className="modal-delete-btn"
                    title="Delete Vendor"
                  >
                    Delete Vendor
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>No vendors added yet.</p>
      )}

      {deleteConfirmId !== null && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Confirm Deletion</h3>
            <p>Are you sure you want to delete this vendor?</p>
            <div className="modal-actions">
              <button className="modal-delete-btn" onClick={confirmDelete} type="button">Yes, Delete</button>
              <button className="modal-cancel-btn" onClick={() => setDeleteConfirmId(null)} type="button">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Vendors;

// import { useSelector, useDispatch } from 'react-redux';
// import { useEffect, useState } from 'react';
// import { Navigate, useNavigate } from 'react-router-dom';
// import {
//   getAllVendorsThunk,
//   deleteVendorThunk,
//   selectAllVendors
// } from '../../store/slices/vendorsSlice';
// import NewVendorFormModal from '../NewVendorFormModal/NewVendorFormModal';
// import './Vendors.css';

// const Vendors = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const sessionUser = useSelector((state) => state.session.user);
//   const vendors = useSelector(selectAllVendors);
//   const [showModal, setShowModal] = useState(false);

//   const canEditVendors = ['edit', 'full'].includes(sessionUser?.planningPermissions);

//   useEffect(() => {
//     if (sessionUser) {
//       dispatch(getAllVendorsThunk());
//     }
//   }, [dispatch, sessionUser]);

//   const handleDelete = async (vendorId) => {
//     if (!window.confirm('Are you sure you want to delete this vendor?')) return;
//     dispatch(deleteVendorThunk(vendorId));
//   };

//   const handleAddVendor = () => {
//     setShowModal(true);
//   };

//   const handleEditVendor = (vendorId) => {
//     navigate(`/vendors/${vendorId}/edit`);
//   };

//   if (!sessionUser) return <Navigate to="/login" replace />;

//   return (
//     <div className="vendors-container">
//       <h1>Vendor Management</h1>
//       <p>Track and manage all your vendors here. You can add, edit, or remove vendors as needed.</p>
//       <div className="vendors-actions">
//         {canEditVendors && (
//           <button className="add-vendor-btn" onClick={handleAddVendor}>
//             Add New Vendor
//           </button>
//         )}
//       </div>

//       {showModal && <NewVendorFormModal onClose={() => setShowModal(false)} />}

//       {vendors.length > 0 ? (
//         <div className="vendors-list">
//           {vendors.map((vendor) => (
//             <div key={vendor.id} className="vendor-card">
//               <h3>
//                 {vendor.name}{' '}
//                 <span className="vendor-status">[{vendor.status}]</span>
//               </h3>
//               <p><strong>Category:</strong> {vendor.category}</p>
//               <p><strong>Contact:</strong> {vendor.contactName || 'N/A'} – {vendor.contactEmail || 'No email'}</p>
//               <p><strong>Phone:</strong> {vendor.contactPhone || 'N/A'}</p>
//               <p><strong>Website:</strong> {
//                 vendor.website ? (
//                   <a href={vendor.website} target="_blank" rel="noopener noreferrer">{vendor.website}</a>
//                 ) : 'N/A'}
//               </p>
//               <p><strong>Description:</strong> {vendor.description || 'No description'}</p>

//               {vendor.VendorAttachments?.length > 0 && (
//                 <div className="vendor-attachments">
//                   <h4>Attachments:</h4>
//                   <ul>
//                     {vendor.VendorAttachments.map((att) => (
//                       <li key={att.id}>
//                         <a href={att.fileUrl} target="_blank" rel="noopener noreferrer">
//                           {att.name} ({att.type || 'file'})
//                         </a>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               )}

//               {canEditVendors && (
//                 <div className="vendor-actions">
//                   <button
//                     onClick={() => handleEditVendor(vendor.id)}
//                     className="edit-btn"
//                     title="Edit Vendor"
//                   >
//                     Edit
//                   </button>
//                   <button
//                     onClick={() => handleDelete(vendor.id)}
//                     className="delete-btn"
//                     title="Delete Vendor"
//                   >
//                     Delete
//                   </button>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p>No vendors added yet.</p>
//       )}
//     </div>
//   );
// };

// export default Vendors;