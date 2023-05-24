import { Button, Result } from "antd"
import { useNavigate } from "react-router-dom"


function Error404 (){
    
    const navigate = useNavigate()
    
    const handledhome =()=>{

        navigate("/");

    }

    return   <Result
    status="403"
    title="403"
    subTitle="Sorry, you are not authorized to access this page."
    extra={<Button type="primary" onClick={handledhome}>Back Home</Button>}
  />
}

export default Error404