import API from "../services/api";
import { useEffect,useState } from "react";
import AddressForm from "../components/AddressForm/AddressForm";
const Profile = () => {
    const [user, setUser] = useState(null);
    const [addresses, setAddresses] = useState([]);
    const [editingAddress,setEditingAddress]=useState(null)
    const [showAddressForm, setShowAddressForm] = useState(false);
    const [showChangePassword, setShowChangePassword]= useState(false);
    const [passwordData, setPasswordData] = useState({
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
});

const [passwordMessage, setPasswordMessage] = useState("");
const [passwordError, setPasswordError] = useState("");
const handlePasswordChange = (e) => {
  const { name, value } = e.target;

  setPasswordData({
    ...passwordData,
    [name]: value,
  });
};

const handleChangePassword = async (e) => {
  e.preventDefault();

  setPasswordMessage("");
  setPasswordError("");

  if (passwordData.newPassword !== passwordData.confirmPassword) {
    setPasswordError("New passwords do not match");
    return;
  }

  try {
    const token = localStorage.getItem("token");

    const response = await API.put(
      "/auth/change-password",
      {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setPasswordMessage(response.data.message);

    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  } catch (error) {
    setPasswordError(
      error.response?.data?.message || "Failed to change password"
    );
  }
};

const handleMakeDefault = async (addressId) => {
  try {
    const token = localStorage.getItem("token");

    const response = await API.put(
      `/auth/addresses/${addressId}/default`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("DEFAULT ADDRESS UPDATED:", response.data);

    setAddresses(response.data.addresses);
  } catch (error) {
    console.error("MAKE DEFAULT ADDRESS ERROR:", error);
  }
};

    const handleDeleteAddress = async (addressId) => {
  try {
    const token = localStorage.getItem("token");

    const response = await API.delete(
      `/auth/addresses/${addressId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("ADDRESS DELETED:", response.data);

    setAddresses(response.data.addresses);
  } catch (error) {
    console.error("DELETE ADDRESS ERROR:", error);
  }
};
    useEffect(() => {
  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await API.get("/auth/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(response.data.user);
    } catch (error) {
      console.error("GET PROFILE ERROR:", error);
    }
  };

  fetchProfile();
}, []);

useEffect(() => {
  const fetchAddresses = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await API.get("/auth/addresses", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setAddresses(response.data.addresses);
    } catch (error) {
      console.error("GET ADDRESSES ERROR:", error);
    }
  };

  fetchAddresses();
}, []);

//   return (
//     <div>
//       <h1>My Profile</h1>
//       <h2>Personal Information</h2>
//       <p>Name:{user?.name} </p>
//       <p>Email:{user?.email} </p>
//       <p>Phone:{user?.phone} </p>

// <h2>Saved Addresses</h2>

// {addresses.length === 0 ? (
//   <p>No saved addresses yet.</p>
// ) : (
//   addresses.map((address) => (
//     <div key={address._id}>
//       <h3>{address.label}</h3>

//       {address.isDefault && <p>Default</p>}

//       <p>{address.fullName}</p>
//       <p>{address.phone}</p>
//       <p>{address.addressLine}</p>
//       <p>
//         {address.city}, {address.state} - {address.pincode}
//       </p>
//       <p>{address.country}</p>
//       <button type="button" onClick={()=>{setEditingAddress(address);
//         setShowAddressForm(true);}
//       }>edit</button> 

//       <button
//   type="button"
//   onClick={() => {
//   const confirmed = window.confirm(
//     "Are you sure you want to delete this address?"
//   );

//   if (confirmed) {
//     handleDeleteAddress(address._id);
//   }
// }}
// >
//   Delete
// </button>
// {!address.isDefault && (
//   <button
//     type="button"
//     onClick={() => handleMakeDefault(address._id)}
//   >
//     Make Default
//   </button>
// )}
//     </div>
//   ))
// )}

// <div>
//   <h2>Change Password</h2>

//   <button
//   type="button"
//   onClick={() => {
//     // setEditingAddress(null);
//     setShowChangePassword(true);
//   }}
// >
//  Change Password
// </button>
// {showChangePassword && (
//   <form onSubmit={handleChangePassword}>
//     <div>
//       <label>Current Password</label>

//       <input
//         type="password"
//         name="currentPassword"
//         value={passwordData.currentPassword}
//         onChange={handlePasswordChange}
//         required
//       />
//     </div>

//     <div>
//       <label>New Password</label>

//       <input
//         type="password"
//         name="newPassword"
//         value={passwordData.newPassword}
//         onChange={handlePasswordChange}
//         required
//       />
//     </div>

//     <div>
//       <label>Confirm New Password</label>

//       <input
//         type="password"
//         name="confirmPassword"
//         value={passwordData.confirmPassword}
//         onChange={handlePasswordChange}
//         required
//       />
//     </div>

//     {passwordError && (
//       <p>{passwordError}</p>
//     )}

//     {passwordMessage && (
//       <p>{passwordMessage}</p>
//     )}

//     <button type="submit">
//       Change Password
//     </button>
// <button
//   type="button"
//   onClick={() => {
//     setShowChangePassword(false);

//     setPasswordData({
//       currentPassword: "",
//       newPassword: "",
//       confirmPassword: "",
//     });

//     setPasswordError("");
//     setPasswordMessage("");
//   }}
// >
//   Cancel
// </button>
//   </form>
//   )}
// </div>

// <h2>Add New Address</h2>
// <button
//   type="button"
//   onClick={() => {
//     setEditingAddress(null);
//     setShowAddressForm(true);
//   }}
// >
//   Add New Address
// </button>

// {showAddressForm && (
//   <AddressForm
//     address={editingAddress}
//     onAddressAdded={(updatedAddresses) => {
//       setAddresses(updatedAddresses);
//       setEditingAddress(null);
//       setShowAddressForm(false);
//     }}
//       onCancel={() => {
//       setEditingAddress(null);
//       setShowAddressForm(false);
//     }}
//   />
// )}
//     </div>
//   );


return (
  <div className="container my-5">
    <h1 className="mb-4 fw-bold">My Profile</h1>

    <div className="row g-4">
      {/* Left Column: Personal Information & Change Password */}
      <div className="col-lg-5">
        {/* Personal Information Card */}
        <div className="card shadow-sm mb-4">
          <div className="card-header bg-white py-3">
            <h2 className="h5 mb-0 fw-semibold">Personal Information</h2>
          </div>
          <div className="card-body">
            <p className="mb-2">
              <strong className="text-muted">Name:</strong> {user?.name}
            </p>
            <p className="mb-2">
              <strong className="text-muted">Email:</strong> {user?.email}
            </p>
            <p className="mb-0">
              <strong className="text-muted">Phone:</strong> {user?.phone}
            </p>
          </div>
        </div>

        {/* Change Password Card */}
        <div className="card shadow-sm">
          <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center">
            <h2 className="h5 mb-0 fw-semibold">Security</h2>
            {!showChangePassword && (
              <button
                type="button"
                className="btn btn-outline-primary btn-sm"
                onClick={() => {
                  // setEditingAddress(null);
                  setShowChangePassword(true);
                }}
              >
                Change Password
              </button>
            )}
          </div>

          {showChangePassword && (
            <div className="card-body">
              <form onSubmit={handleChangePassword}>
                <div className="mb-3">
                  <label className="form-label">Current Password</label>
                  <input
                    type="password"
                    name="currentPassword"
                    className="form-control"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">New Password</label>
                  <input
                    type="password"
                    name="newPassword"
                    className="form-control"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Confirm New Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    className="form-control"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    required
                  />
                </div>

                {passwordError && (
                  <div className="alert alert-danger py-2" role="alert">
                    {passwordError}
                  </div>
                )}

                {passwordMessage && (
                  <div className="alert alert-success py-2" role="alert">
                    {passwordMessage}
                  </div>
                )}

                <div className="d-flex gap-2">
                  <button type="submit" className="btn btn-primary">
                    Update Password
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => {
                      setShowChangePassword(false);
                      setPasswordData({
                        currentPassword: "",
                        newPassword: "",
                        confirmPassword: "",
                      });
                      setPasswordError("");
                      setPasswordMessage("");
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>

      {/* Right Column: Saved Addresses & Add New Address */}
      <div className="col-lg-7">
        <div className="card shadow-sm">
          <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center">
            <h2 className="h5 mb-0 fw-semibold">Saved Addresses</h2>
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={() => {
                setEditingAddress(null);
                setShowAddressForm(true);
              }}
            >
              + Add New Address
            </button>
          </div>

          <div className="card-body">
            {/* Address Form Section */}
            {showAddressForm && (
              <div className="border rounded p-3 mb-4 bg-light">
                <AddressForm
                  address={editingAddress}
                  onAddressAdded={(updatedAddresses) => {
                    setAddresses(updatedAddresses);
                    setEditingAddress(null);
                    setShowAddressForm(false);
                  }}
                  onCancel={() => {
                    setEditingAddress(null);
                    setShowAddressForm(false);
                  }}
                />
              </div>
            )}

            {/* Saved Addresses List */}
            {addresses.length === 0 ? (
              <p className="text-muted mb-0">No saved addresses yet.</p>
            ) : (
              <div className="row g-3">
                {addresses.map((address) => (
                  <div key={address._id} className="col-12">
                    <div
                      className={`card ${
                        address.isDefault ? "border-primary" : ""
                      }`}
                    >
                      <div className="card-body">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <h3 className="h6 fw-bold mb-0">{address.label}</h3>
                          {address.isDefault && (
                            <span className="badge bg-primary">Default</span>
                          )}
                        </div>

                        <p className="fw-semibold mb-1">{address.fullName}</p>
                        <p className="text-muted small mb-1">
                          Phone: {address.phone}
                        </p>
                        <p className="mb-1">{address.addressLine}</p>
                        <p className="mb-1">
                          {address.city}, {address.state} - {address.pincode}
                        </p>
                        <p className="mb-3">{address.country}</p>

                        <div className="d-flex flex-wrap gap-2">
                          <button
                            type="button"
                            className="btn btn-outline-secondary btn-sm"
                            onClick={() => {
                              setEditingAddress(address);
                              setShowAddressForm(true);
                            }}
                          >
                            Edit
                          </button>

                          <button
                            type="button"
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => {
                              const confirmed = window.confirm(
                                "Are you sure you want to delete this address?"
                              );
                              if (confirmed) {
                                handleDeleteAddress(address._id);
                              }
                            }}
                          >
                            Delete
                          </button>

                          {!address.isDefault && (
                            <button
                              type="button"
                              className="btn btn-outline-primary btn-sm ms-auto"
                              onClick={() => handleMakeDefault(address._id)}
                            >
                              Make Default
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  </div>
);

};

export default Profile;