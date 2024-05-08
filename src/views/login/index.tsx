import { Button, Card, Form, Input } from 'antd'
import type { FC } from 'react'

type FieldType = {
  contact?: string
  password?: string
}

const Login: FC = () => {
  return (
    <div>
      <Card title='Login' bordered={false} style={{ width: 300 }}>
        <Form validateTrigger='onBlur'>
          <Form.Item<FieldType>
            name='contact'
            rules={[{ required: true, message: 'Please input your contact!' }]}>
            <Input placeholder='请输入用户名' />
          </Form.Item>
          <Form.Item<FieldType> name='password'>
            <Input placeholder='请输入密码' />
          </Form.Item>
          <Form.Item<FieldType>>
            <Button type='primary' htmlType='submit' block size='large'>
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Login
