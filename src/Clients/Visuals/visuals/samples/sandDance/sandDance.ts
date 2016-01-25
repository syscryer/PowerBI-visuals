/*
 *  Power BI Visualizations
 *
 *  Copyright (c) Microsoft Corporation
 *  All rights reserved. 
 *  MIT License
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the ""Software""), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in 
 *  all copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED *AS IS*, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR 
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE 
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 *  THE SOFTWARE.
 */

/// <reference path="app/_references.ts" />
/// <reference path="../../../_references.ts" />

//--------- SandDance End.

module powerbi.visuals.samples {
    import ClassAndSelector = jsCommon.CssConstants.ClassAndSelector;
    import createClassAndSelector = jsCommon.CssConstants.createClassAndSelector;

    module chartType {
        export const types: string[] = [
            "Scatter",
            "Column",
            "Bar",
            "Flat",
            "Squarify",
            "Density",
            "Violin",
            "Radial",
            "Scatter-3D",
            "Stacks"
        ];

        export const type: IEnumType = createEnumType(types.map((type: string) => {
            return {
                value: type,
                displayName: type
            };
        }));
    } 

    export interface SandDanceData {
        [columnName: string]: any[];
    }

    export interface SandDanceDataView {
        settings: SandDanceSettings;
        data: SandDanceData;
        highlights: any[];
    }

    export interface SandDanceConstructorOptions {
        margin?: IMargin;
    }

    export interface SandDanceSettings {
        application: any;
        session: any;
        preloads: any;
        chartType: string;
    }

    interface PanelTable {
        ids: string[];
    }

    interface SandDanceProperty {
        [propertyName: string]: DataViewObjectPropertyIdentifier;
    }

    interface SandDanceProperties {
        [objectName: string]: SandDanceProperty;
    }

    export class SandDance implements IVisual {
        private static ClassName: string = "sandDance";

        private static Properties: SandDanceProperties = {
            settings: {
                chartType: {
                    objectName: "settings",
                    propertyName: "chartType"
                }
            }
        };

        private static FileInfoSelector: ClassAndSelector = createClassAndSelector("fileInfo");

        private static PlayAndIconBarSelector: ClassAndSelector = createClassAndSelector("playAndIconBar");
        private static PlayPanelSelector: ClassAndSelector = createClassAndSelector("playPanel");
        private static PlayExButtonSelector: ClassAndSelector = createClassAndSelector("playExButton");
        private static StopButtonSelector: ClassAndSelector = createClassAndSelector("stopButton");

        private static TextButtonSelector: ClassAndSelector = createClassAndSelector("textButton");

        private static IconBarSelector: ClassAndSelector = createClassAndSelector("iconBar");

        private static SearchPanelSelector: ClassAndSelector = createClassAndSelector("searchPanel");
        private static BtSearchColSelector: ClassAndSelector = createClassAndSelector("btSearchCol");
        private static SearchColSelector: ClassAndSelector = createClassAndSelector("searchCol");
        private static SearchTextSelector: ClassAndSelector = createClassAndSelector("searchText");

        private static LeftPanelSelector: ClassAndSelector = createClassAndSelector("leftPanel");
        private static YStuffSelector: ClassAndSelector = createClassAndSelector("yStuff");
        private static YButtonSelector: ClassAndSelector = createClassAndSelector("yButton");
        private static YBinsSelector: ClassAndSelector = createClassAndSelector("yBins");
        private static ZStuffSelector: ClassAndSelector = createClassAndSelector("zStuff");
        private static ZButtonSelector: ClassAndSelector = createClassAndSelector("zButton");
        private static ZBinsSelecotr: ClassAndSelector = createClassAndSelector("zBins");

        private static BigBarSelector: ClassAndSelector = createClassAndSelector("bigBar");
        private static NoSpaceTableSelector: ClassAndSelector = createClassAndSelector("noSpaceTable");

        private static ChartSelector: ClassAndSelector = createClassAndSelector("myChart");

        private static Canvas3DSelector: ClassAndSelector = createClassAndSelector("canvas3d");
        private static Canvas2DSelector: ClassAndSelector = createClassAndSelector("canvas2d");
        private static SvgSelector: ClassAndSelector = createClassAndSelector("svgDoc");

        private static CanvasElementSelector: ClassAndSelector = createClassAndSelector("canvasElem");
        private static CanvasSelector: ClassAndSelector = createClassAndSelector("canvas");

        private static ChartUxDivSelector: ClassAndSelector = createClassAndSelector("chartUxDiv");

        private static FacetLabelHolderSelector: ClassAndSelector = createClassAndSelector("facetLabelHolder");

        private static RightPanelSelector: ClassAndSelector = createClassAndSelector("rightPanel");
        private static ButtonLegendComboSelector: ClassAndSelector = createClassAndSelector("buttonLegendCombo");
        private static LegendSelector: ClassAndSelector = createClassAndSelector("legend");

        private static BottomPanelSelector: ClassAndSelector = createClassAndSelector("bottomPanel");
        private static XStuffSelector: ClassAndSelector = createClassAndSelector("xStuff");
        private static XButtonSelector: ClassAndSelector = createClassAndSelector("xButton");
        private static XBinsSelector: ClassAndSelector = createClassAndSelector("xBins");

        private static DebugPanelSelector: ClassAndSelector = createClassAndSelector("debugPanel");
        private static DebugPanelItemSelector: ClassAndSelector = createClassAndSelector("debugPanel-item");

        private static Units: string = "px";

        private static DebugPanelItems: string[] = [
            "visStats",
            "gpuStats",
            "hitTestStats",
            "moveStats",
            "drawStats"
        ];

        public static capabilities: VisualCapabilities = {
            dataRoles: [{
                name: "Values",
                kind: VisualDataRoleKind.GroupingOrMeasure
            }],
            dataViewMappings: [{
                table: {
                    rows: {
                        for: { in: 'Values' },
                        dataReductionAlgorithm: { window: { count: 50000 } }
                    },
                    rowCount: { preferred: { min: 1 } }
                }
            }],
            objects: {
                general: {
                    displayName: data.createDisplayNameGetter("Visual_General"),
                    properties: {
                        formatString: { type: { formatting: { formatString: true } } }
                    }
                },
                application: {
                    displayName: "Application",
                    properties: {
                        settings: {
                            displayName: "Settings",
                            type: { text: true }
                        }
                    }
                },
                session: {
                    displayName: "Session",
                    properties: {
                        settings: {
                            displayName: "Settings",
                            type: { text: true }
                        }
                    }
                },
                preloads: {
                    displayName: "Preloads",
                    properties: {
                        settings: {
                            displayName: "Settings",
                            type: { text: true }
                        }
                    }
                },
                settings: {
                    displayName: "Settings",
                    properties: {
                        chartType: {
                            displayName: "Chart Type",
                            type: { enumeration: chartType.type }
                        }
                    }
                }
            },
            supportsHighlight: true,
            suppressDefaultTitle: true
        };

        private margin: IMargin = {
            top: 10,
            right: 10,
            bottom: 10,
            left: 10
        };

        private viewport: IViewport;

        private host: IVisualHostServices;

        private rootElement: D3.Selection;
        private mainElement: D3.Selection;
        private viewElement: D3.Selection;

        private canvas3dElement: D3.Selection;
        private canvas2dElement: D3.Selection;
        private svgElement: D3.Selection;

        //TODO: add other elements.

        private coreApplication: beachParty.AppMgrClass;
        private application: beachPartyApp.AppClass;

        private dataView: SandDanceDataView;

        private objectCache: sandDance.ObjectCache;

        constructor(constructorOptions?: SandDanceConstructorOptions) {
            if (constructorOptions) {
                this.margin = constructorOptions.margin || this.margin;
            }
        }

        public init(visualsOptions: VisualInitOptions): void {
            this.host = visualsOptions.host;

            this.addElements(visualsOptions.element.get(0));

            this.setSize(visualsOptions.viewport);

            this.rootElement.style("margin", shapes.Thickness.toCssString(this.margin));

            this.objectCache = new sandDance.ObjectCache();

            this.objectCache.set("hostBus", new sandDance.Bus("hostBus"));
            this.objectCache.set("iframeBus", new sandDance.Bus("iframeBus"));

            this.application = new beachPartyApp.AppClass(
                this.objectCache,
                this.saveSettings.bind(this),
                this.loadSettings.bind(this),
                this.changeChartType.bind(this),
                <HTMLElement> this.rootElement.node());

            this.application.setViewport(this.viewport.width, this.viewport.height);
            this.application.run();

            this.coreApplication = new beachParty.AppMgrClass(this.objectCache, <HTMLElement> this.rootElement.node());

            this.coreApplication.init(
                SandDance.Canvas3DSelector.class,
                SandDance.Canvas2DSelector.class,
                SandDance.SvgSelector.class,
                SandDance.FileInfoSelector.class,
                this.viewport.width,
                this.viewport.height,
                SandDance.DebugPanelItems[0],
                SandDance.DebugPanelItems[1],
                SandDance.DebugPanelItems[2],
                SandDance.DebugPanelItems[3],
                SandDance.DebugPanelItems[4]);

            this.application.coreApplication = this.coreApplication;
        }

        private addElements(element: HTMLElement): void {
            this.rootElement = d3.select(element)
                .append("div")
                .classed(SandDance.ClassName, true);

            this.onStopPropagationHandler(this.rootElement, ["mousedown", "mousemove", "pointerdown", "pointermove"]);

            this.mainElement = this.rootElement
                .append("div");

            this.addFileInfo();
            this.addPlayAndIconBarElement();
            //TODO: insightPanel ?
            this.addBigBarElement();
            this.addLeftPanelElement();
            this.addSearchPanelElement();
            this.addViewElement();
            this.addChartUxDivElement();
            this.addFacetLabelHolderElement();
            this.addRightPanelElement();
            this.addBottomPanelElement();
            //TODO: infoMsgBox ?
            this.addDebugPanelElement();
        }

        private onStopPropagationHandler(element: D3.Selection, events: string[]): void {
            if (!element || !events) {
                return;
            }

            let stopPropagationHandler: () => void = () => {
                d3.event.stopPropagation();
            };

            events.forEach((event: string) => {
                element.on(event, stopPropagationHandler);
            });
        }

        private addFileInfo(): void {
            this.mainElement
                .append("div")
                .classed(SandDance.FileInfoSelector.class, true);
        }

        private addPlayAndIconBarElement(): void {
            let trElement: D3.Selection,
                tdElement: D3.Selection;

            trElement = this.mainElement
                .append("table")
                .classed(SandDance.PlayAndIconBarSelector.class, true)
                .append("tr");

            tdElement = trElement
                .append("td")
                .classed(SandDance.PlayPanelSelector.class, true);

            tdElement
                .append("span")
                .classed(SandDance.StopButtonSelector.class, true)
                .classed(SandDance.TextButtonSelector.class, true);

            tdElement
                .append("span")
                .classed(SandDance.PlayExButtonSelector.class, true)
                .classed(SandDance.TextButtonSelector.class, true);

            trElement
                .append("td")
                .classed(SandDance.IconBarSelector.class, true)
                .classed(SandDance.IconBarSelector.class, true);
        }

        private addBigBarElement(): void {
            this.mainElement
                .append("div")
                .append("table")
                .classed(SandDance.BigBarSelector.class, true)
                .classed(SandDance.BigBarSelector.class, true)
                .classed(SandDance.NoSpaceTableSelector.class, true);
        }

        private addSearchPanelElement(): void {
            let searchPanel: D3.Selection,
                tr: D3.Selection;

            searchPanel = this.mainElement
                .append("table")
                .attr({
                    "data-disabled": false
                })
                .classed(SandDance.SearchPanelSelector.class, true)
                .classed(SandDance.NoSpaceTableSelector.class, true);

            tr = searchPanel.append("tr");

            tr.append("td")
                .classed(SandDance.BtSearchColSelector.class, true)
                .append("span")
                .classed(SandDance.SearchColSelector.class, true);

            tr.append("td")
                .append("input")
                .attr({
                    "type": "text",
                    "title": "search for the specified text in the selected column (to the left)",
                    "placeholder": "Search",
                    "tabindex": 0
                })
                .classed(SandDance.SearchTextSelector.class, true);
        }

        private addLeftPanelElement(): void {
            let leftPanelElement: D3.Selection,
                yStuffElement: D3.Selection,
                zStuffElement: D3.Selection;

            leftPanelElement = this.mainElement
                .append("div")
                .classed(SandDance.LeftPanelSelector.class, true);

            yStuffElement = leftPanelElement
                .append("div")
                .classed(SandDance.YStuffSelector.class, true);

            yStuffElement
                .append("div")
                .classed(SandDance.YButtonSelector.class, true);

            yStuffElement
                .append("div")
                .classed(SandDance.YBinsSelector.class, true);

            zStuffElement = leftPanelElement
                .append("div") //span
                .classed(SandDance.ZStuffSelector.class, true);

            zStuffElement
                .append("div") //span
                .classed(SandDance.ZButtonSelector.class, true);

            zStuffElement
                .append("div") //span
                .classed(SandDance.ZBinsSelecotr.class, true);
        }

        private addViewElement(): void {
            this.viewElement = this.mainElement
                .append("div")
                .classed(SandDance.ChartSelector.class, true);

            this.canvas3dElement = this.viewElement
                .append("canvas")
                .classed(SandDance.Canvas3DSelector.class, true)
                .classed(SandDance.CanvasElementSelector.class, true)
                .classed(SandDance.CanvasSelector.class, true);

            this.canvas2dElement = this.viewElement
                .append("canvas")
                .classed(SandDance.Canvas2DSelector.class, true)
                .classed(SandDance.CanvasElementSelector.class, true)
                .classed(SandDance.CanvasSelector.class, true);

            this.svgElement = this.viewElement
                .append("svg")
                .classed(SandDance.SvgSelector.class, true)
                .classed(SandDance.CanvasSelector.class, true);
        }

        private addChartUxDivElement(): void {
            this.viewElement
                .append("div")
                .classed(SandDance.ChartUxDivSelector.class, true);
        }

        private addFacetLabelHolderElement(): void {
            this.mainElement
                .append("div")
                .classed(SandDance.FacetLabelHolderSelector.class, true);
        }

        private addRightPanelElement(): void {
            let rightPanel: D3.Selection,
                tables: PanelTable[] = [
                    {
                        ids: [ null, "colorButton", "opacityAdj", "colorLegend" ]
                    }, {
                        ids: [ null, "sizeButton", "sizeFactorAdj", "sizeLegend" ]
                    }, {
                        ids: [ "imageMapper", "imageButton", "imageAdj", "imageLegend" ]
                    }, {
                        ids: [ null, "facetButton", "facetBins", "facetLegend" ]
                    }
                ];

            rightPanel = this.mainElement
                .append("div")
                .classed(SandDance.RightPanelSelector.class, true);

            tables.forEach((table: PanelTable) => {
                this.addRightPanelItem(rightPanel, table.ids);
            });
        }

        private addRightPanelItem(element: D3.Selection, ids: string[] = []): void {
            let table: D3.Selection,
                firstTr: D3.Selection,
                secondTr: D3.Selection;

            table = element
                .append("div")
                .classed(SandDance.ButtonLegendComboSelector.class, true);

            firstTr = table
                .append("tr")
                .classed(ids[0] === undefined ? "" : ids[0], true);

            secondTr = table
                .append("tr");

            firstTr
                .append("td")
                .classed(ids[1], true);

            firstTr
                .append("td")
                .classed(ids[2], true)
                .style("display", "none");

            secondTr
                .append("td")
                .attr("colspan", 2)
                .append("div")
                .classed(ids[3], true)
                .classed(SandDance.LegendSelector.class, true)
                .style("display", "none");
        }

        private addBottomPanelElement(): void {
            let bottomPanel: D3.Selection,
                table: D3.Selection,
                tr: D3.Selection;

            bottomPanel = this.mainElement
                .append("div")
                .classed(SandDance.BottomPanelSelector.class, true);

            table = bottomPanel
                .append("table")
                .classed(SandDance.XStuffSelector.class, true);

            tr = table.append("tr");

            tr.append("td")
                .classed(SandDance.XButtonSelector.class, true);

            tr.append("td")
                .classed(SandDance.XBinsSelector.class, true);
        }

        private addDebugPanelElement(): void {
            let debugPanel: D3.Selection;

            debugPanel = this.mainElement
                .append("div")
                .classed(SandDance.DebugPanelSelector.class, true);

            SandDance.DebugPanelItems.forEach((debugPanelItem: string) => {
                debugPanel
                    .append("div")
                    .classed(debugPanelItem, true)
                    .classed(SandDance.DebugPanelItemSelector.class, true);
            });
        }

        private saveSettings(settings: any, type: sandDance.SettingsType): void {
            if (!settings) {
                return;
            }

            let settingInJson: string = JSON.stringify(settings),
                objectName: string;

            objectName = sandDance.SettingsType[type];

            this.host.persistProperties(<VisualObjectInstancesToPersist> {
                replace: [{
                    objectName: objectName,
                    displayName: objectName,
                    selector: null,
                    properties: {
                        settings: settingInJson
                    }
                }]
            });
        }

        private loadSettings(type: sandDance.SettingsType): any {
            if (!this.dataView ||
                !this.dataView.settings) {
                return {};
            }

            return this.dataView.settings[sandDance.SettingsType[type]];
        }

        private changeChartType(chartType: string): void {
            this.host.persistProperties(<VisualObjectInstancesToPersist> {
                merge: [{
                    objectName: "settings",
                    displayName: "settings",
                    selector: null,
                    properties: {
                        chartType: chartType
                    }
                }]
            });
        }

        public update(visualUpdateOptions: VisualUpdateOptions): void {
            if (!visualUpdateOptions ||
                !visualUpdateOptions.dataViews ||
                !visualUpdateOptions.dataViews[0]){
                return;
            }

            let dataView: SandDanceDataView = this.converter(visualUpdateOptions.dataViews[0]);

            this.setSize(visualUpdateOptions.viewport);
            this.updateElements();

            this.application.update(this.viewport.width, this.viewport.height);

            if (!this.dataView || JSON.stringify(this.dataView.data) !== JSON.stringify(dataView.data)) {
                this.application.updateDataView(dataView.data);
            }

            if (this.dataView && JSON.stringify(this.dataView.highlights) !== JSON.stringify(dataView.highlights)) {
                this.application.setSelection(dataView.highlights);
            }

            if (this.dataView) {
                this.application.changeChartType(dataView.settings.chartType);
            }

            if (!this.dataView) {
                this.dataView = dataView;

                this.application.loadAppSettings();
                this.application.loadLastSession();
            }

            this.dataView = dataView;
        }

        public converter(dataView: DataView): SandDanceDataView {
            let data: SandDanceData = {};

            if (dataView &&
                dataView.table &&
                dataView.table.columns &&
                dataView.table.columns.length > 0 &&
                dataView.table.rows) {
                dataView.table.columns.forEach((column: DataViewMetadataColumn, index: number) => {
                    data[column.displayName] = dataView.table.rows.map((row: any[]) => {
                        return row[index];
                    });
                });
            }

            return {
                settings: this.parseSettings(dataView),
                data: data,
                highlights: this.parseHighlights(dataView)
            };
        }

        private parseHighlights(dataView: DataView): any[] {
            let highlights: any[] = [];

            if (!dataView ||
                !dataView.categorical ||
                !dataView.categorical.values ||
                !dataView.categorical.values[0] ||
                !dataView.categorical.values[0].highlights) {
                return highlights;
            }

            dataView.categorical.values[0].highlights.forEach((highlight: any, index: number) => {
                if (highlight) {
                    highlights.push(index);
                }
            });

            return highlights;
        }

        private parseSettings(dataView: DataView): SandDanceSettings {
            if (!dataView ||
                !dataView.metadata ||
                !dataView.metadata.objects) {
                return {
                    application: {},
                    session: {},
                    preloads: {},
                    chartType: chartType[1]
                };
            }

            let settings: SandDanceSettings = <SandDanceSettings> {},
                objects: DataViewObjects = dataView.metadata.objects,
                settingsNames: string[] = [
                    "application",
                    "session",
                    "preloads"
                ];

            settingsNames.forEach((settingsName: string) => {
                let currentSettings: any;

                if (objects[settingsName] && objects[settingsName]["settings"]) {
                    currentSettings = JSON.parse(<string> objects[settingsName]["settings"]);
                } else {
                    currentSettings = {};
                }

                settings[settingsName] = currentSettings;
            });

            settings.chartType = DataViewObjects.getValue<string>(
                objects,
                SandDance.Properties["settings"]["chartType"],
                chartType.types[1]);

            return settings;
        }

        private setSize(viewport: IViewport): void {
            let height: number,
                width: number;

            height =
                viewport.height -
                this.margin.top -
                this.margin.bottom;

            width =
                viewport.width -
                this.margin.left -
                this.margin.right;

            this.viewport = {
                height: height,
                width: width
            };
        }

        private updateElements(): void {
            let width: number = 0,
                height: number = 0;

            if (this.viewport) {
                width = this.viewport.width;
                height = this.viewport.height;
            }

            this.rootElement.style({
                width: `${width}${SandDance.Units}`,
                height: `${height}${SandDance.Units}`
            });
        }

        public enumerateObjectInstances(options: EnumerateVisualObjectInstancesOptions): VisualObjectInstanceEnumeration  {
            let enumeration = new ObjectEnumerationBuilder();

            switch (options.objectName) {
                case "settings": {
                    let settings: VisualObjectInstance = {
                        objectName: "settings",
                        displayName: "settings",
                        selector: null,
                        properties: {
                            chartType: this.dataView.settings.chartType
                        }
                    };

                    enumeration.pushInstance(settings);
                    break;
                }
            }

            return enumeration.complete();
        }

        public destroy(): void {
            this.rootElement.remove();
            this.rootElement = null;

            this.coreApplication = null;
            this.application = null;
        }
    }
}