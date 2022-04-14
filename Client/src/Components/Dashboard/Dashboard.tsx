import "./Dashboard.css"
import { useEffect } from "react"
import { useAuth0 } from "@auth0/auth0-react"
import axios from "axios"

const Dashboard: React.FC = () => {
    const { isAuthenticated, isLoading, user, error, loginWithRedirect } = useAuth0();

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

    return (
        <>
            {!isAuthenticated
                ? <div>
                    <div style={{ marginTop: "20%" }} >
                        <p>Redirecting to login page...</p>
                    </div>
                </div>
                : <div>This is dashboard</div>
            }
        </>
    )
}

export default Dashboard
