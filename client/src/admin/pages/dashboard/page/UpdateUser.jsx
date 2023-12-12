import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@material-ui/core";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import PersonIcon from "@material-ui/icons/Person";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import SideBar from "./Sidebar";
import { ToastContainer, toast } from 'react-toastify';
import { useParams } from "react-router-dom";
import { getAdminUser } from "../../../../redux/features/admin/adminProducts/adminReducer";

const UpdateUser = ({ match }) => {
  const [user, setUser] = useState('')
  const dispatch = useDispatch();
  const params = useParams()
  const { user: item } = useSelector((state) => state.admin);
  const { id } = params;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const getUser = async () => {
    if(id){
      dispatch(getAdminUser(id))
    }
  }

  useEffect(() => {
    getUser()
  }, [id])

  useEffect(() => {
    setUser(item?.user)
  }, [item])


  useEffect(() => {
    if (user && user?._id !== id) {

    } else {
      setName(user?.name);
      setEmail(user?.email);
      setRole(user?.role);
    }

    // if (isUpdated) {
    //   toast.success("User Updated Successfully");
    //   history.push("/admin/users");
    // }

  }, [dispatch, id]);

  const updateUserSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("role", role);

  };

  return (
    <Fragment>
      <div className="flex w-full pr-10">
        <div className="w-full">
          <form
            className="createProductForm"
            onSubmit={updateUserSubmitHandler}
          >
            <h1 className="text-2xl mb-8">Update user</h1>

            <div>
              <PersonIcon />
              <input
                type="text"
                placeholder="Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <MailOutlineIcon />
              <input
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <VerifiedUserIcon />
              <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="">Choose Role</option>
                <option value="admin">admin</option>
                <option value="user">user</option>
              </select>
            </div>

            <Button
              id="createProductBtn"
              type="submit"
            >
              Update
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateUser;
