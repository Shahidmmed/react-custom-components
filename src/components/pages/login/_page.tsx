import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../../core/stores/slices/user_slice";
import { cacheUserData } from "../../../core/utility";
import { Images } from "../../Assets"
import { FormWizard, IFormWizardInit, WizardStage } from "../../layout/form_wizard/_component"
import { Otp } from "../../layout/Otp";

export const Login = () => {
    let formWizard: IFormWizardInit;
    const [otp, setOtp] = useState<string>()

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onInit = (e: IFormWizardInit) => {
        formWizard = e;
    }

    const onBeforeNext = (stage: number, data: any) => {
        // Just a simple validation before form can proceed to next
        var { username, password } = data;
        if (stage == 0) {
            if (username == '' || username == null) { window.alert("Username is required"); return false; }
            if (password == '' || password == null) { window.alert("Password is required"); return false; }

            return true;
        }

        if (stage == 1) {
            if (otp == '' || otp == null) { window.alert("OTP is required"); return false; }

            return true;
        }

        return false;
    }

    const onSubmit = (stage: number, data: any) => {
        var userInfo = { username: 'data.username', roles: ['role1', 'role2'] };
        cacheUserData(JSON.stringify(userInfo), 'data.token.token', (new Date).toISOString());

        dispatch(setUser(userInfo));
        navigate('/');
    }
    return (

        <section className="h-full gradient-form bg-gray-200 md:h-screen">
            <div className="container  mx-auto justify-items-center py-12 px-6 h-full">
                <div className="flex justify-center  items-center flex-wrap h-full g-6 text-gray-800">
                    <div className="xl:w-10/12">
                        <div className="block bg-white shadow-lg rounded-lg">
                            <div className="lg:flex lg:flex-wrap g-0">
                                <div className="lg:w-6/12 px-4 md:px-0">
                                    <div className="md:p-12 md:mx-6">
                                        <div className="text-center">
                                            <img
                                                className="mx-auto w-48"
                                                src={Images.LogoSvg}
                                                alt="logo"
                                            />
                                            <h4 className="text-xl font-semibold mt-1 mb-12 pb-1">Sample MTN Login</h4>
                                        </div>
                                        <FormWizard className="w-full" stageHiddenCls="hidden"
                                            stageVisibleCls=""
                                            beforeNext={onBeforeNext}
                                            onInit={onInit}
                                            onSubmit={onSubmit}
                                            currentStage={0}>
                                            <WizardStage key={0}>
                                                <p className="mb-4">Please login to your account</p>
                                                <div className="mb-4">
                                                    <input
                                                        type="text"
                                                        className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                                        name="username"
                                                        id="exampleFormControlInput1"
                                                        placeholder="Username"
                                                    />
                                                </div>
                                                <div className="mb-4">
                                                    <input
                                                        type="password"
                                                        className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                                        name="password"
                                                        id="exampleFormControlInput1"
                                                        placeholder="Password"
                                                    />
                                                </div>
                                                <div className="text-center pt-1 mb-12 pb-1">
                                                    <button
                                                        className="form-wizard-next inline-block bg-mtn px-6 py-2.5 text-black font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3"
                                                        data-mdb-ripple="true"
                                                        data-mdb-ripple-color="light"
                                                    >
                                                        Log in
                                                    </button>
                                                    <a className="text-gray-500" href="#!">Forgot password?</a>
                                                </div>
                                            </WizardStage>
                                            <WizardStage key={0}>
                                                <div className="mb-4">
                                                    Enter OTP Sent to 024 1233 123
                                                </div>
                                                <div className="mb-4">
                                                    <Otp length={6} onChange={(value) => { setOtp(value) }} />
                                                </div>
                                                <div className="text-center pt-1 mb-12 pb-1">
                                                    <button
                                                        className="inline-block bg-mtn px-6 py-2.5 text-black font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3"
                                                        data-mdb-ripple="true"
                                                        data-mdb-ripple-color="light"
                                                    >
                                                        Verify OTP
                                                    </button>
                                                    <a className="text-gray-500" href="#!">Forgot password?</a>
                                                </div>
                                            </WizardStage>
                                        </FormWizard>



                                    </div>
                                </div>
                                <div
                                    className="lg:w-6/12 bg-mtn flex items-center lg:rounded-r-lg rounded-b-lg lg:rounded-bl-none"
                                >
                                    <div className="text-black px-4 py-6 md:p-12 md:mx-6">
                                        <h4 className="text-xl font-semibold mb-6">We are more than just a company</h4>
                                        <p className="text-sm ">
                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                                            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                                            consequat.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    )
}