import "./input.css"

const Input = ({type, required, valor, actualizarValor, name,id, label}) =>{
    return (
    <div className ={`input-contenedor ${type}`}>   
        <input id={id} type={type} name={name} required = {required} value={valor} onChange={e=>actualizarValor(e.target.value)} placeholder={name} ></input>
        <label htmlFor={id}>{label}</label>    
    </div>)
}
export default Input