/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */

import * as ibas from "ibas/index";
import * as openui5 from "openui5/index";
import * as bo from "../../../borep/bo/index";
import { IReceiptEditView } from "../../../bsapp/receipt/index";

/**
 * 编辑视图-收款
 */
export class ReceiptEditView extends ibas.BOEditView implements IReceiptEditView {
    /** 删除数据事件 */
    deleteDataEvent: Function;
    /** 新建数据事件，参数1：是否克隆 */
    createDataEvent: Function;
    /** 添加收款-项目事件 */
    addReceiptItemEvent: Function;
    /** 删除收款-项目事件 */
    removeReceiptItemEvent: Function;
    /** 选择收款客户事件 */
    chooseBusinessPartnerEvent: Function;

    /** 绘制视图 */
    darw(): any {
        let that: this = this;
        let formTop: sap.ui.layout.form.SimpleForm = new sap.ui.layout.form.SimpleForm("", {
            editable: true,
            content: [
                new sap.ui.core.Title("", { text: ibas.i18n.prop("receiptpayment_general_information") }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_receipt_businesspartnertype") }),
                new sap.m.Select("", {
                    items: openui5.utils.createComboBoxItems(bo.emBusinessPartnerType),
                }).bindProperty("selectedKey", {
                    path: "businessPartnerType",
                    type: "sap.ui.model.type.Integer",
                }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_receipt_businesspartnercode") }),
                new sap.m.Input("", {
                    showValueHelp: true,
                    valueHelpRequest: function (): void {
                        that.fireViewEvents(that.chooseBusinessPartnerEvent);
                    }
                }).bindProperty("value", {
                    path: "businessPartnerCode",
                }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_receipt_businesspartnername") }),
                new sap.m.Input("", {
                    editable: false,
                }).bindProperty("value", {
                    path: "businessPartnerName",
                }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_receipt_reference1") }),
                new sap.m.Input("", {
                }).bindProperty("value", {
                    path: "reference1",
                }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_receipt_reference2") }),
                new sap.m.Input("", {
                }).bindProperty("value", {
                    path: "reference2",
                }),
                new sap.ui.core.Title("", { text: ibas.i18n.prop("receiptpayment_status_information") }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_receipt_docnum") }),
                new sap.m.Input("", {
                }).bindProperty("value", {
                    path: "docNum",
                }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_receipt_documentstatus") }),
                new sap.m.Select("", {
                    items: openui5.utils.createComboBoxItems(ibas.emDocumentStatus),
                }).bindProperty("selectedKey", {
                    path: "documentStatus",
                    type: "sap.ui.model.type.Integer",
                }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_receipt_canceled") }),
                new sap.m.Select("", {
                    items: openui5.utils.createComboBoxItems(ibas.emYesNo),
                }).bindProperty("selectedKey", {
                    path: "canceled",
                    type: "sap.ui.model.type.Integer",
                }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_receipt_documentdate") }),
                new sap.m.DatePicker("", {
                }).bindProperty("dateValue", {
                    path: "documentDate",
                }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_receipt_dataowner") }),
                new sap.m.Input("", {
                    showValueHelp: true,
                }).bindProperty("value", {
                    path: "dataOwner",
                }),
            ]
        });
        this.tableReceiptItem = new sap.ui.table.Table("", {
            toolbar: new sap.m.Toolbar("", {
                content: [
                    new sap.m.Button("", {
                        text: ibas.i18n.prop("shell_data_add"),
                        type: sap.m.ButtonType.Transparent,
                        icon: "sap-icon://add",
                        press: function (): void {
                            that.fireViewEvents(that.addReceiptItemEvent);
                        }
                    }),
                    new sap.m.Button("", {
                        text: ibas.i18n.prop("shell_data_remove"),
                        type: sap.m.ButtonType.Transparent,
                        icon: "sap-icon://less",
                        press: function (): void {
                            that.fireViewEvents(that.removeReceiptItemEvent,
                                // 获取表格选中的对象
                                openui5.utils.getTableSelecteds<bo.ReceiptItem>(that.tableReceiptItem)
                            );
                        }
                    })
                ]
            }),
            enableSelectAll: false,
            selectionBehavior: sap.ui.table.SelectionBehavior.Row,
            visibleRowCount: ibas.config.get(openui5.utils.CONFIG_ITEM_LIST_TABLE_VISIBLE_ROW_COUNT, 8),
            rows: "{/rows}",
            columns: [
                new sap.ui.table.Column("", {
                    label: ibas.i18n.prop("bo_receiptitem_lineid"),
                    template: new sap.m.Text("", {
                        wrapping: false,
                    }).bindProperty("text", {
                        path: "lineId",
                    }),
                }),
                new sap.ui.table.Column("", {
                    label: ibas.i18n.prop("bo_receiptitem_linestatus"),
                    template: new sap.m.Select("", {
                        width: "100%",
                        items: openui5.utils.createComboBoxItems(ibas.emDocumentStatus),
                    }).bindProperty("selectedKey", {
                        path: "lineStatus",
                        type: "sap.ui.model.type.Integer",
                    })
                }),
                new sap.ui.table.Column("", {
                    label: ibas.i18n.prop("bo_paymentitem_basedocumenttype"),
                    template: new sap.m.Text("", {
                        wrapping: false,
                    }).bindProperty("text", {
                        path: "baseDocumentType",
                    }),
                }),
                new sap.ui.table.Column("", {
                    label: ibas.i18n.prop("bo_paymentitem_basedocumententry"),
                    template: new sap.m.Text("", {
                        wrapping: false,
                    }).bindProperty("text", {
                        path: "baseDocumentEntry",
                    }),
                }),
                new sap.ui.table.Column("", {
                    label: ibas.i18n.prop("bo_paymentitem_basedocumentlineid"),
                    template: new sap.m.Text("", {
                        wrapping: false,
                    }).bindProperty("text", {
                        path: "baseDocumentLineId",
                    }),
                }),
                new sap.ui.table.Column("", {
                    label: ibas.i18n.prop("bo_receiptitem_mode"),
                    template: new sap.m.Input("", {
                        width: "100%",
                    }).bindProperty("value", {
                        path: "mode"
                    })
                }),
                new sap.ui.table.Column("", {
                    label: ibas.i18n.prop("bo_receiptitem_amount"),
                    template: new sap.m.Input("", {
                        width: "100%",
                        type: sap.m.InputType.Number
                    }).bindProperty("value", {
                        path: "amount"
                    })
                }),
                new sap.ui.table.Column("", {
                    label: ibas.i18n.prop("bo_receiptitem_currency"),
                    template: new sap.m.Input("", {
                        width: "100%",
                        type: sap.m.InputType.Text
                    }).bindProperty("value", {
                        path: "currency"
                    })
                }),
                new sap.ui.table.Column("", {
                    label: ibas.i18n.prop("bo_paymentitem_bankcode"),
                    template: new sap.m.Input("", {
                        width: "100%",
                        type: sap.m.InputType.Text
                    }).bindProperty("value", {
                        path: "bankCode"
                    })
                }),
                new sap.ui.table.Column("", {
                    label: ibas.i18n.prop("bo_paymentitem_cardnumber"),
                    template: new sap.m.Input("", {
                        width: "100%",
                        type: sap.m.InputType.Text
                    }).bindProperty("value", {
                        path: "cardNumber"
                    })
                }),
            ]
        });
        let formMiddle: sap.ui.layout.form.SimpleForm = new sap.ui.layout.form.SimpleForm("", {
            editable: true,
            content: [
                new sap.ui.core.Title("", { text: ibas.i18n.prop("bo_receiptitem") }),
                this.tableReceiptItem,
            ]
        });
        let formBottom: sap.ui.layout.form.SimpleForm = new sap.ui.layout.form.SimpleForm("", {
            editable: true,
            content: [
                new sap.ui.core.Title("", { text: ibas.i18n.prop("receiptpayment_remarks_information") }),
                new sap.m.TextArea("", {
                    rows: 5,
                }).bindProperty("value", {
                    path: "remarks",
                }),
                new sap.ui.core.Title("", { text: ibas.i18n.prop("receiptpayment_total_information") }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_receipt_documenttotal") }),
                new sap.m.Input("", {
                    editable: false,
                }).bindProperty("value", {
                    path: "documentTotal",
                }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_payment_documentcurrency") }),
                new sap.m.Input("", {
                    editable: false,
                }).bindProperty("value", {
                    path: "documentCurrency",
                }),
            ],
        });
        this.layoutMain = new sap.ui.layout.VerticalLayout("", {
            content: [
                formTop,
                formMiddle,
                formBottom,
            ],
        });
        this.page = new sap.m.Page("", {
            showHeader: false,
            subHeader: new sap.m.Toolbar("", {
                content: [
                    new sap.m.Button("", {
                        text: ibas.i18n.prop("shell_data_save"),
                        type: sap.m.ButtonType.Transparent,
                        icon: "sap-icon://save",
                        press: function (): void {
                            that.fireViewEvents(that.saveDataEvent);
                        }
                    }),
                    new sap.m.Button("", {
                        text: ibas.i18n.prop("shell_data_delete"),
                        type: sap.m.ButtonType.Transparent,
                        icon: "sap-icon://delete",
                        press: function (): void {
                            that.fireViewEvents(that.deleteDataEvent);
                        }
                    }),
                    new sap.m.ToolbarSeparator(""),
                    new sap.m.MenuButton("", {
                        text: ibas.i18n.prop("shell_data_new"),
                        type: sap.m.ButtonType.Transparent,
                        icon: "sap-icon://create",
                        buttonMode: sap.m.MenuButtonMode.Split,
                        defaultAction: function (): void {
                            // 触发新建对象
                            that.fireViewEvents(that.createDataEvent, false);
                        },
                        menu: new sap.m.Menu("", {
                            items: [
                                new sap.m.MenuItem("", {
                                    text: ibas.i18n.prop("shell_data_new"),
                                    icon: "sap-icon://create"
                                }),
                                new sap.m.MenuItem("", {
                                    text: ibas.i18n.prop("shell_data_clone"),
                                    icon: "sap-icon://copy"
                                }),
                            ],
                            itemSelected: function (event: any): void {
                                let item: any = event.getParameter("item");
                                if (item instanceof sap.m.MenuItem) {
                                    if (item.getIcon() === "sap-icon://copy") {
                                        // 触发克隆对象
                                        that.fireViewEvents(that.createDataEvent, true);
                                    } else {
                                        // 触发新建对象
                                        that.fireViewEvents(that.createDataEvent, false);
                                    }
                                }
                            }
                        })
                    }),
                ]
            }),
            content: [this.layoutMain]
        });
        return this.page;
    }
    private page: sap.m.Page;
    private layoutMain: sap.ui.layout.VerticalLayout;
    /** 改变视图状态 */
    private changeViewStatus(data: bo.Receipt): void {
        if (ibas.objects.isNull(data)) {
            return;
        }
        // 新建时：禁用删除，
        if (data.isNew) {
            if (this.page.getSubHeader() instanceof sap.m.Toolbar) {
                openui5.utils.changeToolbarDeletable(<sap.m.Toolbar>this.page.getSubHeader(), false);
            }
        }
        // 不可编辑：已批准，
        if (data.approvalStatus === ibas.emApprovalStatus.APPROVED) {
            if (this.page.getSubHeader() instanceof sap.m.Toolbar) {
                openui5.utils.changeToolbarSavable(<sap.m.Toolbar>this.page.getSubHeader(), false);
                openui5.utils.changeToolbarDeletable(<sap.m.Toolbar>this.page.getSubHeader(), false);
            }
            openui5.utils.changeFormEditable(this.layoutMain, false);
        }
    }
    private tableReceiptItem: sap.ui.table.Table;

    /** 显示数据 */
    showReceipt(data: bo.Receipt): void {
        this.layoutMain.setModel(new sap.ui.model.json.JSONModel(data));
        this.layoutMain.bindObject("/");
        // 监听属性改变，并更新控件
        openui5.utils.refreshModelChanged(this.layoutMain, data);
        // 改变视图状态
        this.changeViewStatus(data);
    }
    /** 显示数据 */
    showReceiptItems(datas: bo.ReceiptItem[]): void {
        this.tableReceiptItem.setModel(new sap.ui.model.json.JSONModel({ rows: datas }));
        // 监听属性改变，并更新控件
        openui5.utils.refreshModelChanged(this.tableReceiptItem, datas);
    }
}
