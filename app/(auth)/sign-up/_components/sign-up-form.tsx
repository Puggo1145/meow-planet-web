"use client"

// ui
import LabelInput from "@/components/label-input"
import { Button } from "@/components/ui/button"
// import { Form } from "@/components/ui/form"


const SignUpForm = () => {
    return (
        // TODO: replace original form with Form component
        <form className="w-full flex flex-col gap-y-4">
            <LabelInput
                label="用户名 (公开显示)"
                type="text"
                placeholder="为自己取一个喜欢的名字吧！"
            />
            <LabelInput
                label="邮箱"
                type="text"
                placeholder="example@email.com"
            />
            <LabelInput
                label="密码"
                type="password"
                placeholder="密码不少于 8 位且包含大小写字母"
            />
            <LabelInput
                label="确认密码"
                type="password"
                placeholder="请再次输入密码"
            />
            <Button className="mt-4">
                注册
            </Button>
        </form>
    )
}

export default SignUpForm;
