import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  DeleteOutlined,
  DownloadOutlined,
  EditOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
  ReloadOutlined,
  SyncOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { exportToExcel } from "@utils";
import { getLineaData, getLineaTotalPoints } from "@utils/getLinea/main.js";
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Layout,
  Modal,
  notification,
  Popconfirm,
  Row,
  Space,
  Spin,
  Statistic,
  Table,
  Tag,
  Tooltip,
} from "antd";
import { useEffect, useState } from "react";
import CountUp from "react-countup";
import "./index.css";
const formatter = (value) => <CountUp end={value} separator="," />;
const { TextArea } = Input;
const { Content } = Layout;
const Linea = () => {
  const [isBatchModalVisible, setIsBatchModalVisible] = useState(false);
  const [batchLoading, setBatchLoading] = useState(false);
  const [data, setData] = useState([]);
  const [batchForm] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [tableLoading, setTableLoading] = useState(false);
  let idCounter = data.length + 1;
  const [initialized, setInitialized] = useState(false);
  const [hideColumn, setHideColumn] = useState(true);
  const [lineaTotalPoints, setLineaTotalPoints] = useState({});
  const toggleHideColumn = () => {
    setHideColumn(!hideColumn);
  };
  const getEyeIcon = () => {
    if (hideColumn) {
      return <EyeInvisibleOutlined />;
    }
    return <EyeOutlined />;
  };
  useEffect(() => {
    setTableLoading(true);
    const storedAddresses = localStorage.getItem("linea_addresses");
    setTimeout(() => {
      setTableLoading(false);
    }, 500);
    getLineaTotalPoints().then((res) => {
      console.log("🚀 ~ file: index.jsx:38 ~ getLineaTotalPoints ~ res:", res);
      const data = res.data.slice(-1)[0];
      //   const str = `
      //     每位用户的平均积分:${data.average_total_xp}
      //     每日用户参与:${data.user}
      //     总得分:${data.total_xp}
      //     `;
      setLineaTotalPoints(data);
    });
    if (storedAddresses) {
      setData(JSON.parse(storedAddresses));
    }

    setInitialized(true);
  }, []);

  useEffect(() => {
    if (!initialized) return;

    localStorage.setItem("linea_addresses", JSON.stringify(data));
  }, [data, initialized]);
  // 列
  const columns = [
    {
      title: "#",
      key: "index",
      align: "center",
      render: (text, record, index) => index + 1,
    },
    {
      title: "备注",
      dataIndex: "name",
      key: "name",
      align: "center",
      className: "name",
      render: (text, record) => {
        const displayText = text || <EditOutlined />;
        return (
          <Popconfirm
            title={
              <div>
                <Input
                  placeholder={"请输入备注"}
                  defaultValue={text}
                  onChange={(e) => {
                    record.name = e.target.value;
                  }}
                  allowClear
                  bordered
                />
              </div>
            }
            icon={<EditOutlined />}
            onConfirm={() => {
              setData([...data]);
              localStorage.setItem("linea_addresses", JSON.stringify(data));
            }}
            onCancel={() => {}}
            okText={"确定"}
            cancelText={"取消"}
          >
            <Tag color="blue" style={{ cursor: "pointer" }}>
              {displayText}
            </Tag>
          </Popconfirm>
        );
      },
    },
    {
      title: (
        <span>
          钱包地址
          <span
            onClick={toggleHideColumn}
            style={{ marginLeft: 8, cursor: "pointer" }}
          >
            {getEyeIcon()}
          </span>
        </span>
      ),
      dataIndex: "address",
      key: "address",
      align: "center",
      className: "address",
      render: (text, record) => {
        if (hideColumn) {
          return text.slice(0, 4) + "***" + text.slice(-4);
        }
        return text;
      },
    },
    {
      title: "Linea",
      children: [
        {
          title: "ETH",
          dataIndex: "balance",
          key: "linea_eth_balance",
          align: "center",
          render: (text, record) => text,
        },
        {
          title: "Tx",
          dataIndex: ["activity", "tx"],
          key: "linea_tx_amount",
          align: "center",
          render: (text, record) => text,
          sorter: (a, b) => a.activity.tx - b.activity.tx,
        },
        {
          title: "最后交易",
          dataIndex: ["activity", "lastTx"],
          key: "linea_latest_tx",
          align: "center",
          render: (text, record) => (
            <a
              href={`https://lineascan.build/address/${record.address}`}
              target="_blank"
            >
              {text}
            </a>
          ),
        },
        {
          title: "LXP-L积分",
          children: [
            {
              title: "总积分(xp)",
              dataIndex: ["xp", "lxp"],
              align: "center",
              render: (text, record) => text,
            },
            {
              title: "排名",
              dataIndex: ["xp", "rank_xp"],
              align: "center",
              render: (text, record) => text,
            },
          ],
        },
        {
          title: "官方桥Tx",
          children: [
            {
              title: "L1->L2",
              dataIndex: ["L1ToL2", "L1ToL2Tx"],
              align: "center",
              render: (text, record) => text,
            },
            {
              title: "L2->L1",
              dataIndex: ["L2ToL1", "L2ToL1Tx"],
              align: "center",
              render: (text, record) => text,
            },
          ],
        },
        {
          title: "官方桥金额(ETH)",
          children: [
            {
              title: "L1->L2",
              dataIndex: ["L1ToL2", "L1ToL2Amount"],
              align: "center",
              render: (text, record) => text,
            },
            {
              title: "L2->L1",
              dataIndex: ["L2ToL1", "L2ToL1Amount"],
              align: "center",
              render: (text, record) => text,
            },
          ],
        },
        {
          title: "活跃统计",
          children: [
            {
              title: "天",
              dataIndex: ["activity", "dayActivity"],
              align: "center",
              render: (text, record) => text,
            },
            {
              title: "周",
              dataIndex: ["activity", "weekActivity"],
              align: "center",
              render: (text, record) => text,
            },
            {
              title: "月",
              dataIndex: ["activity", "monthActivity"],
              align: "center",
              render: (text, record) => text,
            },
            {
              title: "合约",
              dataIndex: ["activity", "contractActivity"],
              align: "center",
              render: (text, record) => text,
            },
            {
              title: "fee(E)",
              dataIndex: ["activity", "fee"],
              align: "center",
              render: (text, record) => text,
              sorter: (a, b) => a.activity.fee - b.activity.fee,
            },
          ],
        },
        {
          title: "状态",
          key: "result",
          align: "center",
          render: (text, record) => (
            <Space>
              {record["result"] === "success" ? (
                <Tag icon={<CheckCircleOutlined />} color="success">
                  成功
                </Tag>
              ) : null}
              {record["result"] === "error" ? (
                <Tooltip title={record["reason"]}>
                  <Tag icon={<CloseCircleOutlined />} color="error">
                    失败{" "}
                  </Tag>
                </Tooltip>
              ) : null}
              {record["result"] === "pending" ? (
                <Tag icon={<SyncOutlined spin />} color="processing">
                  获取中{" "}
                </Tag>
              ) : null}
            </Space>
          ),
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          render: (text, record) => (
            <Space>
              <Popconfirm
                title={"确认删除？"}
                onConfirm={async () => {
                  await handleDelete(record.address);
                }}
              >
                <Button icon={<DeleteOutlined />} />
              </Popconfirm>
              <Button
                icon={<ReloadOutlined />}
                onClick={() => {
                  handleRefresh(record.key);
                }}
              />
            </Space>
          ),
        },
      ],
    },
  ];
  const handleDelete = async (address) => {
    setData(data.filter((item) => item.address !== address));
    localStorage.setItem(
      "linea_addresses",
      JSON.stringify(data.filter((item) => item.address !== address))
    );
  };
  const handleBatchOk = async () => {
    try {
      setBatchLoading(true);
      setIsBatchModalVisible(false);
      const values = await batchForm.validateFields();
      const addresses = values.addresses.split("\n");

      const limit = 2;
      let activePromises = 0;
      let promisesQueue = [];

      const processQueue = () => {
        while (promisesQueue.length > 0 && activePromises < limit) {
          const promise = promisesQueue.shift();
          activePromises += 1;

          promise().finally(() => {
            activePromises -= 1;
            processQueue();
          });
        }
      };

      for (let address of addresses) {
        address = address.trim();
        if (!address.startsWith("0x")) {
          address = "0x" + address;
        }

        const promiseFunction = () =>
          new Promise(async (resolve, reject) => {
            try {
              setData((prevData) => {
                const updatedData = [...prevData];
                const index = updatedData.findIndex(
                  (item) => item.address === address
                );
                if (index === -1) {
                  const newEntry = {
                    key: idCounter.toString(),
                    address: address,
                    result: "pending",
                  };
                  idCounter++;
                  updatedData.push(newEntry);
                }
                return updatedData;
              });
              const response = await getLineaData(address);
              setData((prevData) => {
                const updatedData = [...prevData];
                const index = updatedData.findIndex(
                  (item) => item.address === address
                );
                if (index !== -1) {
                  updatedData[index] = {
                    ...updatedData[index],
                    ...response,
                  };
                }
                return updatedData;
              });
              resolve();
            } catch (error) {
              reject(error);
            }
          });
        promisesQueue.push(promiseFunction);
      }
      processQueue();
      while (activePromises > 0 || promisesQueue.length > 0) {
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
      notification.success({
        message: "成功",
        description: "批量添加完成",
        duration: 1,
      });
    } catch (error) {
      notification.error({
        message: "错误",
        description: error.message,
        duration: 1,
      });
    } finally {
      batchForm.resetFields();
      setSelectedKeys([]);
      setBatchLoading(false);
    }
  };
  const handleRefresh = async (singleKey) => {
    const keys = singleKey ? [singleKey] : selectedKeys;
    if (!keys.length) {
      notification.error({
        message: "错误",
        description: "请先选择要刷新的地址",
        duration: 1,
      });
      return;
    }
    setIsLoading(true);
    try {
      const limit = 2;
      let activePromises = 0;
      let promisesQueue = [];
      const processQueue = () => {
        while (promisesQueue.length > 0 && activePromises < limit) {
          const promise = promisesQueue.shift();
          activePromises += 1;
          promise().finally(() => {
            activePromises -= 1;
            processQueue();
          });
        }
      };
      for (let key of keys) {
        const index = data.findIndex((item) => item.key === key);
        if (index !== -1) {
          const promiseFunction = () =>
            new Promise(async (resolve, reject) => {
              try {
                setData((prevData) => {
                  const updatedData = [...prevData];
                  for (let field in updatedData[index]) {
                    if (
                      field !== "address" &&
                      field !== "name" &&
                      field !== "key"
                    ) {
                      if (field === "result") {
                        updatedData[index][field] = "pending";
                      } else {
                        updatedData[index][field] = null;
                      }
                    }
                  }
                  return updatedData;
                });

                const response = await getLineaData(data[index].address);
                setData((prevData) => {
                  const updatedData = [...prevData];
                  updatedData[index] = {
                    ...updatedData[index],
                    ...response,
                  };
                  localStorage.setItem(
                    "linea_addresses",
                    JSON.stringify(updatedData)
                  );
                  return updatedData;
                });
                resolve();
              } catch (error) {
                reject(error);
              }
            });
          promisesQueue.push(promiseFunction);
        }
      }
      processQueue();
      while (activePromises > 0 || promisesQueue.length > 0) {
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
      notification.success({
        message: "完成",
        description: "刷新地址数据完成",
        duration: 1,
      });
    } catch (error) {
      notification.error({
        message: "错误",
        description: error.message,
        duration: 1,
      });
    } finally {
      setIsLoading(false);
      if (!singleKey) {
        setSelectedKeys([]);
      }
    }
  };

  const handleDeleteSelected = async () => {
    if (!selectedKeys.length) {
      notification.error({
        message: "错误",
        description: "请先选择要删除的地址",
        duration: 1,
      });
      return;
    }
    setData(data.filter((item) => !selectedKeys.includes(item.key)));
    localStorage.setItem(
      "linea_addresses",
      JSON.stringify(data.filter((item) => !selectedKeys.includes(item.key)))
    );
    setSelectedKeys([]);
  };
  const exportToExcelFile = () => {
    exportToExcel(data, "lineaInfo");
  };
  const [editingKey, setEditingKey] = useState(null);
  const rowSelection = {
    selectedRowKeys: selectedKeys,
    onChange: (selectedRowKeys) => {
      setSelectedKeys(selectedRowKeys);
    },
  };
  return (
    <div>
      <Content>
        <Modal
          title="批量添加地址"
          open={isBatchModalVisible}
          onOk={handleBatchOk}
          onCancel={() => {
            setIsBatchModalVisible(false);
            batchForm.resetFields();
          }}
          okText={"添加地址"}
          cancelText={"取消"}
          width={800}
        >
          <Form form={batchForm} layout="vertical">
            <Form.Item
              label="地址"
              name="addresses"
              rules={[
                {
                  required: true,
                  validator: (_, value) => {
                    const addresses = value.split("\n");
                    let errorLines = [];
                    for (let i = 0; i < addresses.length; i++) {
                      let address = addresses[i].trim();
                      if (
                        !address.startsWith("0x") ||
                        (address.length !== 66 && address.length !== 42)
                      ) {
                        errorLines.push(i + 1);
                      }
                    }
                    if (errorLines.length) {
                      return Promise.reject(
                        `行 ${errorLines.join(
                          ", "
                        )} 的地址格式错误，请输入正确的地址`
                      );
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <TextArea
                placeholder="请输入地址，每行一个"
                style={{ width: "100%", height: "300px", resize: "none" }}
              />
            </Form.Item>
          </Form>
        </Modal>
        <div
          style={{
            marginBottom: "50px",
          }}
        >
          <Row
            gutter={12}
            justify="center"
            style={{ backgroundColor: "#f0f0f0", padding: "10px" }}
          >
            <Col span={8}>
              <Card bordered={false}>
                <Statistic
                  title="每位用户的平均积分"
                  value={lineaTotalPoints.average_total_xp}
                  formatter={formatter}
                />
              </Card>
            </Col>
            <Col span={8}>
              <Card bordered={false}>
                <Statistic
                  title="每日用户参与"
                  value={lineaTotalPoints.user}
                  formatter={formatter}
                />
              </Card>
            </Col>
            <Col span={8}>
              <Card bordered={false}>
                <Statistic
                  title="总得分"
                  value={lineaTotalPoints.total_xp}
                  precision={2}
                  formatter={formatter}
                />
              </Card>
            </Col>
          </Row>
          <Spin spinning={tableLoading} size={"small"}>
            <Table
              rowSelection={rowSelection}
              dataSource={data}
              pagination={false}
              bordered={true}
              style={{ marginBottom: "20px" }}
              size={"small"}
              columns={columns}
            />
          </Spin>
        </div>
        <div className="linea_footer">
          <Card size={"small"} style={{ width: "100%" }}>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Button
                type="primary"
                onClick={() => {
                  setIsBatchModalVisible(true);
                }}
                size={"large"}
                style={{ width: "25%" }}
                icon={<UploadOutlined />}
                loading={batchLoading}
              >
                {batchLoading ? "添加中..." : "添加地址"}
              </Button>
              <Button
                type="primary"
                onClick={() => handleRefresh()}
                loading={isLoading}
                size={"large"}
                style={{ width: "25%" }}
                icon={<SyncOutlined />}
              >
                刷新选中地址
              </Button>
              <Popconfirm
                title={"确认删除" + selectedKeys.length + "个地址？"}
                onConfirm={async () => {
                  await handleDeleteSelected();
                }}
              >
                <Button
                  type="primary"
                  danger
                  size={"large"}
                  style={{ width: "25%" }}
                  icon={<DeleteOutlined />}
                >
                  删除选中地址
                </Button>
              </Popconfirm>
              <Button
                type="primary"
                icon={<DownloadOutlined />}
                size={"large"}
                style={{ width: "8%" }}
                onClick={exportToExcelFile}
              />
            </div>
          </Card>
        </div>
      </Content>
    </div>
  );
};
export default Linea;
