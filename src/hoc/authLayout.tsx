
const authLayout=(ChildComponent:any)=>{

    const AuthLayout=(props:any)=>(
        <section className="vh-100">
                <div className="container-fluid h-custom">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        {/* <div className="col-md-9 col-lg-6 col-xl-5">
                            <img alt="hey" src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" className="img-fluid"/>
                        </div> */}
                        <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                            <ChildComponent {...props} />
                        </div>
                    </div>
                </div>
            </section>
    )
    return AuthLayout;
}

export default authLayout;