import { useState,useEffect } from "react";
import API from "../../services/api";
const AddressForm = ({address, onAddressAdded, onCancel }) => {
  const [formData, setFormData] = useState({
    label: address?.label || "",
  fullName: address?.fullName || "",
  phone: address?.phone || "",
  addressLine: address?.addressLine || "",
  city: address?.city || "",
  state: address?.state || "",
  pincode: address?.pincode || "",
  country: address?.country || "",
  });

useEffect(() => {
  if (address) {
    setFormData({
      label: address.label || "",
      fullName: address.fullName || "",
      phone: address.phone || "",
      addressLine: address.addressLine || "",
      city: address.city || "",
      state: address.state || "",
      pincode: address.pincode || "",
      country: address.country || "",
    });
  } else {
    setFormData({
      label: "",
      fullName: "",
      phone: "",
      addressLine: "",
      city: "",
      state: "",
      pincode: "",
      country: "",
    });
  }
}, [address]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const token = localStorage.getItem("token");
    let response;
    if (address) {
      response = await API.put(
        `/auth/addresses/${address._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } else {
      response = await API.post(
        "/auth/addresses",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    }
    console.log("ADDRESS SAVED:", response.data);
    if (response.data.addresses) {
      onAddressAdded(response.data.addresses);
    } else if (response.data.user?.addresses) {
      onAddressAdded(response.data.user.addresses);
    }
  } catch (error) {
    console.error("SAVE ADDRESS ERROR:", error);
  }
};
  return (
    <form onSubmit={handleSubmit}>
      <input
        name="label"
        placeholder="Address label (Home, Office)"
        value={formData.label}
        onChange={handleChange}
      />
      <input
        name="fullName"
        placeholder="Full name"
        value={formData.fullName}
        onChange={handleChange}
      />
      <input
        name="phone"
        placeholder="Phone"
        value={formData.phone}
        onChange={handleChange}
      />
      <input
        name="addressLine"
        placeholder="Address"
        value={formData.addressLine}
        onChange={handleChange}
      />
      <input
        name="city"
        placeholder="City"
        value={formData.city}
        onChange={handleChange}
      />
      <input
        name="state"
        placeholder="State"
        value={formData.state}
        onChange={handleChange}
      />
      <input
        name="pincode"
        placeholder="Pincode"
        value={formData.pincode}
        onChange={handleChange}
      />
      <input
        name="country"
        placeholder="Country"
        value={formData.country}
        onChange={handleChange}
      />
      <button type="button" onClick={onCancel}>
  Cancel
</button>
      <button type="submit"> {address ? "Update Address" : "Save Address"}</button>
    </form>
  );
};

export default AddressForm;