import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { axiosInstance } from "../config";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const path = location.pathname.split("/")[2];

  // console.log(user);

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await axiosInstance.get("/user/" + path);
      setUsername(res.data.username);
      console.log(res.data.username);
      setEmail(res.data.email);
      setPassword(res.data.password);
    };
    fetchProfile();
  }, []);

  const handleUserUpdate = async () => {
    let success = false;
    // Tampilkan konfirmasi SweetAlert2
    const result = await Swal.fire({
      title: "Konfirmasi Update",
      text: "Apakah Anda yakin ingin melakukan update?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, Update!",
      cancelButtonText: "Batal",
    });

    // Jika pengguna mengonfirmasi update
    if (result.isConfirmed) {
      try {
        // Lakukan pembaruan
        await axiosInstance.put("/user/" + user._id, { username, email, password }, { withCredentials: true });
        // Tampilkan pesan sukses menggunakan SweetAlert2
        Swal.fire("Sukses!", "Data berhasil diperbarui.", "success");
        success = true;
      } catch (err) {
        console.error(err);
        // Tampilkan pesan error menggunakan SweetAlert2
        Swal.fire("Error", "Mohon masukkan data yang lebih unik.", "error");
      } finally {
        if (success) {
          window.location.reload();
        }
      }
    }
  };

  const handleUserDelete = async () => {
    // Tampilkan konfirmasi SweetAlert2
    const result = await Swal.fire({
      title: "Konfirmasi Hapus Akun",
      text: "Apakah Anda yakin ingin menghapus akun?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, Hapus!",
      cancelButtonText: "Batal",
      dangerMode: true, // Menambahkan warna merah pada tombol konfirmasi
    });

    // Jika pengguna mengonfirmasi penghapusan
    if (result.isConfirmed) {
      try {
        // Lakukan penghapusan
        await axiosInstance.delete("/user/" + user._id, { withCredentials: true });
        setUser(null);
        navigate("/");
        // Tampilkan pesan sukses menggunakan SweetAlert2
        Swal.fire("Sukses!", "Akun berhasil dihapus.", "success");
      } catch (err) {
        console.error("Error deleting user:", err);
        // Tampilkan pesan error menggunakan SweetAlert2
        Swal.fire("Error", "Terjadi kesalahan saat menghapus akun.", "error");
      }
    }
  };
  const twoLettersSlice = user ? user.username.slice(0, 2).toUpperCase() : "";

  return (
    <div className="bg-bgnetflix h-full py-24 px-8 ">
      <div className="profile-settings flex justify-center">
        <div className="profile-pic flex justify-center items-center font-bold bg-greenuin w-[100px] h-[100px] rounded-full text-2xl">{twoLettersSlice}</div>
      </div>
      <div className="mx-auto sm:w-[60%] w-[100%] ">
        <div className=" input-settings  mt-4">
          <label htmlFor="username" className="text-primary ">
            Username :
          </label>
          <input defaultValue={username} onChange={(e) => setUsername(e.target.value)} type="text" id="username" className="bg-[#343239] text-primary px-2 my-2 w-full py-2 rounded-md" />
        </div>
        <div className=" input-settings  mt-4">
          <label htmlFor="email" className="text-primary ">
            Email :
          </label>
          <input defaultValue={email} onChange={(e) => setEmail(e.target.value)} type="email" id="email" className="bg-[#343239] text-primary px-2 my-2 w-full py-2 rounded-md" />
        </div>
        <div className=" input-settings  mt-4">
          <label htmlFor="password" className="text-primary ">
            Password :
          </label>
          <input onChange={(e) => setPassword(e.target.value)} type="text" id="password" className="bg-[#343239] text-primary px-2 my-2 w-full py-2 rounded-md" />
        </div>
        <div className="flex gap-2">
          <div className="submit  ">
            <button onClick={handleUserUpdate} className="text-primary bg-greenuin py-2 px-6 rounded-md mt-4 hover:brightness-90 duration-150">
              Update
            </button>
          </div>
          <div className="submit">
            <button onClick={handleUserDelete} className="text-primary bg-red-700 py-2 px-6 rounded-md mt-4 hover:brightness-90 duration-150">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
