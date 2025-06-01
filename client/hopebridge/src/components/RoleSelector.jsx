const RoleSelector=({role,setRole})=>(
    <div className="flex gap-4 my 2">
        <label><input type="radio" value="volunteer" checked={role==="volunteer"} onChange={(e)=>setRole(e.target.value)}/></label>
        <label><input type="radio" value="donor" checked={role==="donor"} onChange={(e)=>setRole(e.target.value)}/></label>
        <label><input type="radio" value="admin" checked={role==="admin"} onChange={(e)=>setRole(e.target.value)}/></label>
    </div>
);
export default RoleSelector;