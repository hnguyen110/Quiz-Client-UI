import {Button, Drawer, Popconfirm, Space} from "antd";

interface Props {
    title: string;
    placement: "top" | "bottom" | "right" | "left";
    width: string | number;
    open: boolean;
    onCloseHandler: any;
    onFinishHandler?: any;
    children: any;
}

export default function GenericDrawer({
                                          title,
                                          placement,
                                          width,
                                          open,
                                          onCloseHandler,
                                          onFinishHandler,
                                          children,
                                      }: Props) {
    return (
        <Drawer
            title={title}
            placement={placement}
            width={width}
            open={open}
            onClose={onCloseHandler}
            mask={false}
            getContainer={false}
            className="absolute"
            extra={
                <Space>
                    <Popconfirm
                        placement="bottomRight"
                        title="Please confirm again that you would like to close this page"
                        onConfirm={onCloseHandler}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type="primary" danger>
                            Cancel
                        </Button>
                    </Popconfirm>

                    {/* {onFinishHandler !== undefined ?? (

                     )} */}
                    <Popconfirm
                        placement="bottomRight"
                        title="Please confirm again that you would like to save and submit the quiz"
                        onConfirm={onFinishHandler}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type="primary">Save And Submit</Button>
                    </Popconfirm>
                </Space>
            }
        >
            {children}
        </Drawer>
    );
}
