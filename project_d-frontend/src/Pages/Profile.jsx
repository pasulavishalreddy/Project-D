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

  return (
    <div>
      <h1>My Profile</h1>
      <h2>Personal Information</h2>
      <p>Name:{user?.name} </p>
      <p>Email:{user?.email} </p>
      <p>Phone:{user?.phone} </p>

<h2>Saved Addresses</h2>

{addresses.length === 0 ? (
  <p>No saved addresses yet.</p>
) : (
  addresses.map((address) => (
    <div key={address._id}>
      <h3>{address.label}</h3>

      {address.isDefault && <p>Default</p>}

      <p>{address.fullName}</p>
      <p>{address.phone}</p>
      <p>{address.addressLine}</p>
      <p>
        {address.city}, {address.state} - {address.pincode}
      </p>
      <p>{address.country}</p>
      <button type="button" onClick={()=>{setEditingAddress(address);
        setShowAddressForm(true);}
      }>edit</button> 

      <button
  type="button"
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
    onClick={() => handleMakeDefault(address._id)}
  >
    Make Default
  </button>
)}
    </div>
  ))
)}

<div>
  <h2>Change Password</h2>

  <button
  type="button"
  onClick={() => {
    // setEditingAddress(null);
    setShowChangePassword(true);
  }}
>
 Change Password
</button>
{showChangePassword && (
  <form onSubmit={handleChangePassword}>
    <div>
      <label>Current Password</label>

      <input
        type="password"
        name="currentPassword"
        value={passwordData.currentPassword}
        onChange={handlePasswordChange}
        required
      />
    </div>

    <div>
      <label>New Password</label>

      <input
        type="password"
        name="newPassword"
        value={passwordData.newPassword}
        onChange={handlePasswordChange}
        required
      />
    </div>

    <div>
      <label>Confirm New Password</label>

      <input
        type="password"
        name="confirmPassword"
        value={passwordData.confirmPassword}
        onChange={handlePasswordChange}
        required
      />
    </div>

    {passwordError && (
      <p>{passwordError}</p>
    )}

    {passwordMessage && (
      <p>{passwordMessage}</p>
    )}

    <button type="submit">
      Change Password
    </button>
<button
  type="button"
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
  </form>
  )}
</div>

<h2>Add New Address</h2>
<button
  type="button"
  onClick={() => {
    setEditingAddress(null);
    setShowAddressForm(true);
  }}
>
  Add New Address
</button>

{showAddressForm && (
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
)}
    </div>
  );
};

export default Profile;