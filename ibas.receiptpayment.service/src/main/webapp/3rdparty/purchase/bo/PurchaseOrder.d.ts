/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */

import {
    emYesNo,
    emDocumentStatus,
    emBOStatus,
    emApprovalStatus,
    IBusinessObject,
    IBusinessObjects,
    IBOMasterData,
    IBOMasterDataLine,
    IBODocument,
    IBODocumentLine,
    IBOSimple,
    IBOSimpleLine
} from "ibas/index";
import {
    emItemType
} from "3rdparty/materials/index";
import {

} from "../Datas";

/** 采购订单 */
export interface IPurchaseOrder extends IBODocument {

    /** 凭证编号 */
    docEntry: number;

    /** 期间编号 */
    docNum: number;

    /** 期间 */
    period: number;

    /** 取消 */
    canceled: emYesNo;

    /** 状态 */
    status: emBOStatus;

    /** 审批状态 */
    approvalStatus: emApprovalStatus;

    /** 单据状态 */
    documentStatus: emDocumentStatus;

    /** 对象类型 */
    objectCode: string;

    /** 创建日期 */
    createDate: Date;

    /** 创建时间 */
    createTime: number;

    /** 修改日期 */
    updateDate: Date;

    /** 修改时间 */
    updateTime: number;

    /** 版本 */
    logInst: number;

    /** 服务系列 */
    series: number;

    /** 数据源 */
    dataSource: string;

    /** 创建用户 */
    createUserSign: number;

    /** 修改用户 */
    updateUserSign: number;

    /** 创建动作标识 */
    createActionId: string;

    /** 更新动作标识 */
    updateActionId: string;

    /** 数据所有者 */
    dataOwner: number;

    /** 团队成员 */
    teamMembers: string;

    /** 数据所属组织 */
    organization: string;

    /** 过账日期 */
    postingDate: Date;

    /** 到期日 */
    deliveryDate: Date;

    /** 凭证日期 */
    documentDate: Date;

    /** 参考1 */
    reference1: string;

    /** 参考2 */
    reference2: string;

    /** 备注 */
    remarks: string;

    /** 已引用 */
    referenced: emYesNo;

    /** 已删除 */
    deleted: emYesNo;

    /** 供应商代码 */
    supplierCode: string;

    /** 供应商名称 */
    supplierName: string;

    /** 联系人 */
    contactPerson: number;

    /** 税率 */
    taxRate: number;

    /** 税总额 */
    taxTotal: number;

    /** 折扣 */
    discount: number;

    /** 折扣总计 */
    discountTotal: number;

    /** 单据货币 */
    documentCurrency: string;

    /** 单据交换率 */
    documentRate: number;

    /** 单据总计 */
    documentTotal: number;

    /** 已付款总计 */
    paidTotal: number;

    /** 付款条款代码 */
    paymentCode: string;

    /** 舍入 */
    rounding: emYesNo;

    /** 舍入差额 */
    diffAmount: number;

    /** 项目代码 */
    project: string;


    /** 采购订单-行集合 */
    purchaseOrderItems: IPurchaseOrderItems;


}

/** 采购订单-行 集合 */
export interface IPurchaseOrderItems extends IBusinessObjects<IPurchaseOrderItem, IPurchaseOrder> {

    /** 创建并添加子项 */
    create(): IPurchaseOrderItem;
}

/** 采购订单-行 */
export interface IPurchaseOrderItem extends IBODocumentLine {

    /** 编码 */
    docEntry: number;

    /** 行号 */
    lineId: number;

    /** 显示顺序 */
    visOrder: number;

    /** 类型 */
    objectCode: string;

    /** 实例号（版本） */
    logInst: number;

    /** 数据源 */
    dataSource: string;

    /** 取消 */
    canceled: emYesNo;

    /** 状态 */
    status: emBOStatus;

    /** 单据状态 */
    lineStatus: emDocumentStatus;

    /** 创建日期 */
    createDate: Date;

    /** 创建时间 */
    createTime: number;

    /** 修改日期 */
    updateDate: Date;

    /** 修改时间 */
    updateTime: number;

    /** 创建用户 */
    createUserSign: number;

    /** 修改用户 */
    updateUserSign: number;

    /** 创建动作标识 */
    createActionId: string;

    /** 更新动作标识 */
    updateActionId: string;

    /** 参考1 */
    reference1: string;

    /** 参考2 */
    reference2: string;

    /** 已引用 */
    referenced: emYesNo;

    /** 已删除 */
    deleted: emYesNo;

    /** 基于类型 */
    baseDocumentType: string;

    /** 基于标识 */
    baseDocumentEntry: number;

    /** 基于行号 */
    baseDocumentLineId: number;

    /** 原始类型 */
    originalDocumentType: string;

    /** 原始标识 */
    originalDocumentEntry: number;

    /** 原始行号 */
    originalDocumentLineId: number;

    /** 物料编号 */
    itemCode: string;

    /** 物料/服务描述 */
    itemDescription: string;

    /** 物料类型 */
    itemType: emItemType;

    /** 序号管理 */
    serialManagement: emYesNo;

    /** 批号管理 */
    batchManagement: emYesNo;

    /** 数量 */
    quantity: number;

    /** 计量单位 */
    uom: string;

    /** 仓库 */
    warehouse: string;

    /** 价格 */
    price: number;

    /** 货币 */
    currency: string;

    /** 汇率 */
    rate: number;

    /** 行总计 */
    lineTotal: number;

    /** 行交货日期 */
    deliveryDate: Date;

    /** 剩余未清数量 */
    openQuantity: number;

    /** 行折扣 */
    discount: number;

    /** 未清金额 */
    openAmount: number;

    /** 科目代码 */
    accountCode: string;

    /** 折扣前价格 */
    unitPrice: number;

    /** 税定义 */
    tax: string;

    /** 税率 */
    taxRate: number;

    /** 税总额 */
    taxTotal: number;

    /** 项目代码 */
    project: string;

    /** 分配规则1 */
    distributionRule1: string;

    /** 分配规则2 */
    distributionRule2: string;

    /** 分配规则3 */
    distributionRule3: string;

    /** 分配规则4 */
    distributionRule4: string;

    /** 分配规则5 */
    distributionRule5: string;


}


