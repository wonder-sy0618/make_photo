import React, { Component } from 'react';

import moment from "moment"
import Layout from 'antd/lib/layout'
import Button from 'antd/lib/button'
import Breadcrumb from "antd/lib/breadcrumb"
import Icon from "antd/lib/icon"
import Form from "antd/lib/form"
import DatePicker from "antd/lib/date-picker"
import Upload from "antd/lib/upload"
import Input from "antd/lib/input"
import Row from "antd/lib/row"
import Col from "antd/lib/col"
import InputNumber from "antd/lib/input-number"
import Card from "antd/lib/card"
import Alert from "antd/lib/alert"

import "./YouthCalendar.css"
import icon from "../icon.png"

import imgtreat from "../imgtreat/"
import qrcode from "qrcode"
import solarlunar from "solarlunar"

const { Header, Footer, Sider, Content } = Layout;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

export default class YouthCalendar extends Component {

  constructor() {
    super();
    this.state = {
      showImage : undefined,
      width : 798,
      height : 1356,
      day : moment(),
      dayFontSize : 15,       // 字号比例
      dayFont : "px 黑体 bold",
      dayOtherLocal :32,    // 左右文字位置，宽度的百分比
      dayOtherFont : "30px 黑体",
      dayTop : 46,            // 百分比
      dayLeftText : undefined,  // 每日禁忌
      imageTop : undefined,
      imageTopBorder : 3.76,  // 百分比
      iconSizeByWidth : 10,          // 百分比
      iconLeft : 5,
      iconTop : 5.5,
      linkUrl : undefined,
      linkUrlSize : 22,       // 百分比
      linkUrlLeft : 5.5,     // 百分比
      linkUrlBottom : 2.5,     // 百分比
      linkUrlTitle : "扫一扫了解更多好青年事迹",
      footHeight : 16,        // 百分数
      backgroundStyle : "white",
      footStyle : "#d0d0d0",
      middleSaying : undefined, // "“现在，青春是用来奋斗的\n将来，青春是用来回忆的。”",
      middleSayingAuthor : undefined,  // "习近平",
      middleSayingPos : 70,     // 中间话的位置
      footSaying : undefined, // "我要怀着一颗博爱与勇敢的心去面对，\n生命有终点，感恩无长假，用爱丈量幸福的宽度。",
      footSayingAuthor : undefined  // "中国好青年青春宣言",
    }
  }

  componentDidMount() {

  }

  updateImage() {
    imgtreat.create(
      this.state.width,
      this.state.height
    ).then(canvas => {
      {
        let context = canvas.getContext("2d")
        // 背景
        context.fillStyle = this.state.backgroundStyle;
        context.fillRect(0, 0, canvas.width, canvas.height);
      }
      // 顶部图片
      let drawImageTop = () => {
        if (!this.state.imageTop) {
          return true
        }
        return imgtreat.imageOpen(
          this.state.imageTop
        ).then(imgObj => {
          canvas.getContext("2d")
              .drawImage(
                imgObj,
                canvas.width * this.state.imageTopBorder / 100, canvas.width * this.state.imageTopBorder / 100,
                canvas.width - canvas.width * this.state.imageTopBorder * 2 / 100, imgObj.height / imgObj.width * canvas.width);
        }).then(() => {
          return imgtreat.imageOpen(icon)
        }).then(imgObj => {
          canvas.getContext("2d")
              .drawImage(
                imgObj,
                canvas.width * this.state.iconLeft / 100, canvas.width * this.state.iconTop / 100,
                canvas.width * this.state.iconSizeByWidth / 100 * 2, canvas.width * this.state.iconSizeByWidth / 100 * 2);
        })
      }
      // 日期区域
      let drawDay = () => {
        imgtreat.textDraw(canvas, this.state.day.format("DD"), canvas.width / 2, canvas.height * this.state.dayTop / 100, {
          fillStyle : "black",
          font : this.state.dayFontSize * canvas.height / 100 + this.state.dayFont,
          middlePos : true,
          wordSpacing : 1.2
        })
        let chinaCal = solarlunar.solar2lunar(this.state.day.format("YYYY"), this.state.day.format("MM"), this.state.day.format("DD"));
        imgtreat.textDraw(canvas, chinaCal.gzYear + "年",
          canvas.width / 2 - canvas.width * this.state.dayOtherLocal / 100,
          canvas.height * this.state.dayTop / 100, {
            fillStyle : "black",
            font : this.state.dayOtherFont,
            middlePos : true,
            wordSpacing : 1
          })
        if (this.state.dayLeftText) {
          imgtreat.textDraw(canvas, this.state.dayLeftText,
            canvas.width / 2 - canvas.width * this.state.dayOtherLocal / 100 - 20,
            canvas.height * this.state.dayTop / 100 + (this.state.dayFontSize * canvas.height / 100) / 2 + 18, {
              fillStyle : "black",
              font : this.state.dayOtherFont,
              middlePos : true,
              lineSpacing : 1.1,
              isVertical : true
            })
        }
        imgtreat.textDraw(canvas, chinaCal.monthCn + chinaCal.dayCn,
          canvas.width / 2 - canvas.width * this.state.dayOtherLocal / 100,
          canvas.height * this.state.dayTop / 100 + (this.state.dayFontSize * canvas.height / 100), {
            fillStyle : "black",
            font : this.state.dayOtherFont,
            middlePos : true,
            wordSpacing : 1
          })
        imgtreat.textDraw(canvas, ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"][chinaCal.nWeek-1],
          canvas.width / 2 + canvas.width * this.state.dayOtherLocal / 100,
          canvas.height * this.state.dayTop / 100, {
            fillStyle : "black",
            font : this.state.dayOtherFont,
            middlePos : true,
            wordSpacing : 1
          })
        imgtreat.textDraw(canvas, chinaCal.cMonth + "月",
          canvas.width / 2 + canvas.width * this.state.dayOtherLocal / 100,
          canvas.height * this.state.dayTop / 100 + (this.state.dayFontSize * canvas.height / 100) / 2, {
            fillStyle : "black",
            font : this.state.dayOtherFont,
            middlePos : true,
            wordSpacing : 0.7
          })
        imgtreat.textDraw(canvas, chinaCal.ncWeek,
          canvas.width / 2 + canvas.width * this.state.dayOtherLocal / 100,
          canvas.height * this.state.dayTop / 100 + (this.state.dayFontSize * canvas.height / 100), {
            fillStyle : "black",
            font : this.state.dayOtherFont,
            middlePos : true,
            wordSpacing : 1
          })
      }
      let drawMiddleSaying = () => {
        if (!this.state.middleSaying || !this.state.middleSayingAuthor) {
          return true;
        }
        let x = canvas.width / 2;
        let y = canvas.height * this.state.middleSayingPos / 100
        imgtreat.textDraw(canvas, this.state.middleSaying, x, y, {
            fillStyle : "black",
            font : "28px 黑体",
            middlePos : true,
            wordSpacing : 1.05,
            lineSpacing : 1.5
          })
        imgtreat.textDraw(canvas, "—— "+this.state.middleSayingAuthor, x + 120, y + 10 + (this.state.middleSaying.split("\n").length * 40), {
            fillStyle : "black",
            font : "22px 黑体",
            middlePos : false,
            wordSpacing : 1,
            lineSpacing : 1.5
          })
      }
      // 底部灰色区域
      let drawFoot = () => {
        let context = canvas.getContext("2d");
        context.fillStyle = this.state.footStyle;
        context.fillRect(
          0,
          canvas.height * (100 - this.state.footHeight) / 100,
          canvas.width,
          canvas.height * this.state.footHeight / 100);
      }
      let drawFootQrcode = () => {
        if (!this.state.linkUrl) {
          return true
        }
        return qrcode.toDataURL(
          this.state.linkUrl,
          {
            margin : 1
          }
        ).then(url => imgtreat.imageOpen(
          url
        )).then(imgObj => {
          let qrcodeSize = canvas.width * this.state.linkUrlSize / 100;
          let x = canvas.width * this.state.linkUrlLeft / 100;
          let y = canvas.height - canvas.height * this.state.linkUrlBottom / 100 - qrcodeSize;
          canvas.getContext('2d').drawImage(imgObj, x, y, qrcodeSize, qrcodeSize)
          imgtreat.textDraw(canvas, this.state.linkUrlTitle, x + qrcodeSize / 2, y+qrcodeSize+2, {
            fillStyle : "black",
            font : '16px Arial',
            middlePos : true
          })
        })
      }
      let drayFootSaying = () => {
        if (!this.state.footSaying || !this.state.footSayingAuthor) {
          return true;
        }
        // 在底部，除去二维码后，剩下的空间输出文字
        let qrcodeLeft = canvas.width * this.state.linkUrlLeft / 100 * 2;
        let qrcodeSize = canvas.width * this.state.linkUrlSize / 100 + qrcodeLeft;
        let width = canvas.width - qrcodeSize;
        let height = canvas.height * this.state.footHeight / 100
        let x = qrcodeSize + 0;
        let y = canvas.height - height + 30
        imgtreat.textDraw(canvas, this.state.footSaying, x, y, {
            fillStyle : "black",
            font : "22px 黑体",
            middlePos : false,
            wordSpacing : 1.05,
            lineSpacing : 1.5
          })
        imgtreat.textDraw(canvas, "—— "+this.state.footSayingAuthor, x + 120, y + 10 + (this.state.footSaying.split("\n").length * 30), {
            fillStyle : "black",
            font : "22px 黑体",
            middlePos : false,
            wordSpacing : 1,
            lineSpacing : 1.5
          })
      }
      // 所有处理完成
      Promise.all([
        drawImageTop(),
        drawMiddleSaying(),
        drawFoot(),
        drawFootQrcode(),
        drawDay(),
        drayFootSaying(),
      ]).then(() => {
        this.setState({
          showImage : canvas.toDataURL("image/png")
        })
      })

    })
  }

  render() {
    return (
      <Layout className="layout">
        <Header>
          <h1 style={{color : 'white'}} >
            <Icon type="schedule" style={{marginRight : 20}} />
            青年台历制作
          </h1>
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <div style={{ margin: '16px 0' }} ></div>
          <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
            <Row>
              <Col sm={24} md={12} lg={12} >
                <Form>
                  <Form.Item {...formItemLayout} label="分辨率" >
                      <InputNumber min={125} max={5184}
                        value={this.state.width}
                        onChange={e => {
                          this.setState({
                            width : e.target.value
                          })
                          this.updateImage();
                        }} />
                      <Icon type="close" style={{marginRight : 5}} />
                      <InputNumber min={125} max={2912}
                        value={this.state.height}
                        onChange={e => {
                          this.setState({
                            height : e.target.value
                          })
                          this.updateImage();
                        }} />
                  </Form.Item>
                  <Form.Item {...formItemLayout} label="制作日期" >
                      <DatePicker defaultValue={this.state.day}
                        onChange={day => {
                          this.setState({
                            day : day
                          })
                          this.updateImage();
                        }}
                        />
                  </Form.Item>
                  <Form.Item {...formItemLayout} label="顶部图片" >
                    <Upload
                      ref="form_upload_image_top"
                      accept="image/*"
                      customRequest={file => {
                        // 不上传到服务器，只返回base64
                        let reader = new FileReader();
                        reader.onprogress = file.onProgress;
                        reader.onload = () => {
                          let base64 = reader.result;
                          file.onSuccess(base64)
                        }
                        reader.readAsDataURL(file.file)
                      }}
                      beforeUpload={(file, fileList) => {
                        // 只允许上传一张
                        if (this.refs.form_upload_image_top.state.fileList.length > 0) {
                          return false;
                        }
                      }}
                      onChange={info => {
                        this.setState({
                          imageTop : info.file.response
                        })
                        this.updateImage();
                      }} >
                      <Button>
                        <Icon type="upload" /> 点击上传
                      </Button>
                    </Upload>
                  </Form.Item>
                  <Form.Item {...formItemLayout} label="每日宜忌" >
                      <Input
                        value={this.state.dayLeftText}
                        onChange={e => {
                          this.setState({
                            dayLeftText : e.target.value
                          })
                          this.updateImage();
                        }}
                        ></Input>
                  </Form.Item>
                  <Form.Item {...formItemLayout} label="名人名言" >
                    <Input.Group>
                      <Input.TextArea placeholder="名人名言"
                        autosize={{minRows: 2, maxRows: 4}}
                        value={this.state.middleSaying}
                        onChange={e => {
                          this.setState({
                            middleSaying : e.target.value
                          })
                          this.updateImage();
                        }}
                        ></Input.TextArea>
                      <Input placeholder="名人名言署名"
                        value={this.state.middleSayingAuthor}
                        onChange={e => {
                          this.setState({
                            middleSayingAuthor : e.target.value
                          })
                          this.updateImage();
                        }}
                        ></Input>
                    </Input.Group>
                  </Form.Item>
                  <Form.Item {...formItemLayout} label="青年宣言" >
                    <Input.Group>
                      <Input.TextArea placeholder="青年宣言"
                        autosize={{minRows: 2, maxRows: 4}}
                        value={this.state.footSaying}
                        onChange={e => {
                          this.setState({
                            footSaying : e.target.value
                          })
                          this.updateImage();
                        }}
                        ></Input.TextArea>
                      <Input placeholder="青年宣言署名"
                        value={this.state.footSayingAuthor}
                        onChange={e => {
                          this.setState({
                            footSayingAuthor : e.target.value
                          })
                          this.updateImage();
                        }}
                        ></Input>
                    </Input.Group>
                  </Form.Item>
                  <Form.Item {...formItemLayout} label="二维码地址" >
                      <Input placeholder="http://"
                        value={this.state.linkUrl}
                        onChange={e => {
                          this.setState({
                            linkUrl : e.target.value
                          })
                          this.updateImage();
                        }}
                        ></Input>
                  </Form.Item>
                </Form>
              </Col>
              <Col sm={0} md={12} lg={12} >
                <Card
                  hoverable
                  style={{ width: 399 }}
                  bodyStyle={{border : "1px solid #e2e2e2"}}
                  cover={this.state.showImage ? <img alt="proview" src={this.state.showImage} /> : <Alert message="请完善表单" type="warning" /> }
                  >
                  {this.state.showImage ?
                    <Card.Meta
                      title="创建完成"
                      description="请在上方图片上右键，保存图片"
                      ></Card.Meta>
                    : "" }
                </Card>
              </Col>
            </Row>
            <Row>
              <Col sm={24} md={0} lg={0} xl={0} xxl={0} >
                <Card
                  hoverable
                  style={{ width: 399 }}
                  bodyStyle={{border : "1px solid #e2e2e2"}}
                  cover={this.state.showImage ? <img alt="proview" src={this.state.showImage} /> : <Alert message="请完善表单" type="warning" /> }
                  >
                  {this.state.showImage ?
                    <Card.Meta
                      title="创建完成"
                      description="请在上方图片上右键，保存图片"
                      ></Card.Meta>
                    : "" }
                </Card>
              </Col>
            </Row>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Power by Ant Design, React
        </Footer>
      </Layout>
    )
  }

}
