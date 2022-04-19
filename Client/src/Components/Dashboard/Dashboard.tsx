import "./Dashboard.css"
import { useEffect, useState } from "react"
import { useAuth0 } from "@auth0/auth0-react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

const Dashboard: React.FC = () => {
    const [folders, setFolders] = useState<any[]>([])
    const { isAuthenticated, isLoading, user, error, loginWithRedirect, getAccessTokenSilently } = useAuth0();
    const navigate = useNavigate()

    useEffect(() => {
        if (error) {
            alert(error.message)
            window.location.search = ""
        }
        else if (isAuthenticated && user) {
            axios.post("/update-user-details", { user })
                .then((res) => console.log(res.data.message))
                .catch(err => console.log(err.response))
        }
    }, [error, isAuthenticated, user])

    useEffect(() => {
        const getFolders = async () => {
            const token = await getAccessTokenSilently()

            axios({
                method: "GET",
                url: `/get-folders?userId=${user?.sub}`,
                headers: {
                    "authorization": `Bearer ${token}`
                }
            })
                .then(res => setFolders(res.data.folders))
                .catch(error => console.log(error.response.data))
        }

        if (!isLoading) getFolders()
    }, [getAccessTokenSilently, isLoading, user?.sub])

    if (isLoading) {
        return (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh" }}>
                <div className="spinner-border text-primary" role="status" style={{ width: "3rem", height: "3rem" }}>
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        )
    }

    if (!isAuthenticated) {
        loginWithRedirect()
    }

    const redirectTo = (id: String) => {
        navigate(`/folder/${id}`)
    }

    return (
        <>
            {!isAuthenticated
                ? <div>
                    <div style={{ marginTop: "20%" }} >
                        <p>Redirecting to login page...</p>
                    </div>
                </div>
                : <div className="container">
                    <div className="row">
                        {folders.map((folder, ind) => {
                            return (
                                <div className="col-4 my-3" key={ind}>
                                    <div className="card">
                                        <div className="card-body" onClick={() => redirectTo(folder?._id)}>
                                            <h5 className="card-title">{folder?.folderName}</h5>
                                            {/* <p className="card-text">Created On: </p> */}
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            }
        </>
    )
}

export default Dashboard
