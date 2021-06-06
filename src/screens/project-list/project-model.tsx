import { Drawer, Button, Spin, Form, Input } from "antd"
import { useProjectModel } from "./util"
import { UserSelect } from 'components/user-select'
import { useAddProject, useEditProject } from "utils/project"
import { useEffect } from "react"
import { ErrorBox } from "components/lib"
import { useForm } from "antd/lib/form/Form"

export const ProjectModel = () => {
  const { projectModelOpen, close, editingProject, isLoading } = useProjectModel()

  const useMutateProject = editingProject ? useEditProject : useAddProject
  const { mutateAsync, isLoading: mutateLoading, error } = useMutateProject()

  const [form] = useForm()
  const onFinish = (values: any) => {
    mutateAsync({...editingProject, ...values}).then(() => {
      form.resetFields()
      close()
    })
  }

  useEffect(() => {
    form.setFieldsValue(editingProject)
  }, [editingProject, form])

  const title = editingProject ? '编辑项目' : '创建项目'

  return (
    <Drawer
      width="100%"
      visible={projectModelOpen}
      onClose={close}
      forceRender={true}
    >
      {
        isLoading ?
          <Spin size="large" /> :
          <>
            <h1>{title}</h1>
            <ErrorBox error={error} />
            <Form form={form} layout="vertical" style={{width: '40rem'}} onFinish={onFinish}>
              <Form.Item label="名称" name="name" rules={[{required: true, message: '请输入项目名'}]}>
                <Input placeholder="请输入项目名称"/>
              </Form.Item>
              <Form.Item label="部门" name="organization" rules={[{required: true, message: '请输入部门名'}]}>
                <Input placeholder="请输入部门名称"/>
              </Form.Item>
              <Form.Item label="负责人" name="personId">
                <UserSelect defaultOptionName="负责人" />
              </Form.Item>
              <Form.Item>
                <Button loading={mutateLoading} type="primary" htmlType="submit">提交</Button>
              </Form.Item>
            </Form>
          </>
      }
    </Drawer>
  )
}
