import '@servicenow/sdk/global'

declare global {
    namespace Now {
        namespace Internal {
            interface Keys extends KeysRegistry {
                explicit: {
                    bom_json: {
                        table: 'sys_module'
                        id: 'c16864aed60b45e4b28d81338a6659d5'
                    }
                    package_json: {
                        table: 'sys_module'
                        id: 'e49478fc6fa54071a132960b6552fac1'
                    }
                }
                composite: [
                    {
                        table: 'sn_glider_source_artifact_m2m'
                        id: '0f0fc6174894404f86c6f4ffcba74535'
                        key: {
                            application_file: '179e1968c7c24dbca8fa5202fe64b07c'
                            source_artifact: '338558159419428d94d42cb863910bd3'
                        }
                    },
                    {
                        table: 'sys_ux_lib_asset'
                        id: '179e1968c7c24dbca8fa5202fe64b07c'
                        key: {
                            name: 'x_snc_wdf_advisory/vendor-react-dom--4cdffd9b'
                        }
                    },
                    {
                        table: 'sn_glider_source_artifact'
                        id: '338558159419428d94d42cb863910bd3'
                        key: {
                            name: 'x_snc_wdf_advisory_incident_manager.do - BYOUI Files'
                        }
                    },
                    {
                        table: 'sn_glider_source_artifact_m2m'
                        id: '5cc12ffd65b54efc8f879360e12220d5'
                        key: {
                            application_file: 'bf7e2f1216ef48b7b697bc454b6eb3cd'
                            source_artifact: '338558159419428d94d42cb863910bd3'
                        }
                    },
                    {
                        table: 'sn_glider_source_artifact_m2m'
                        id: '7c13c9dc93c24b3db524076a3967eac3'
                        key: {
                            application_file: '84a8acc61bd04b0b9d24058ba1ce7548'
                            source_artifact: '338558159419428d94d42cb863910bd3'
                        }
                    },
                    {
                        table: 'sys_ux_lib_asset'
                        id: '81d4fb23973a49daadcd6d57bb855908'
                        key: {
                            name: 'x_snc_wdf_advisory/main.js.map'
                        }
                    },
                    {
                        table: 'sys_ux_lib_asset'
                        id: '84a8acc61bd04b0b9d24058ba1ce7548'
                        key: {
                            name: 'x_snc_wdf_advisory/vendor-react-dom--4cdffd9b.js.map'
                        }
                    },
                    {
                        table: 'sn_glider_source_artifact_m2m'
                        id: '84f7fbd94a29441a987d8756fde3e268'
                        key: {
                            application_file: 'adc3ff0025df4dbba86570707b02027e'
                            source_artifact: '338558159419428d94d42cb863910bd3'
                        }
                    },
                    {
                        table: 'sys_ux_lib_asset'
                        id: 'adc3ff0025df4dbba86570707b02027e'
                        key: {
                            name: 'x_snc_wdf_advisory/main'
                        }
                    },
                    {
                        table: 'sys_ui_page'
                        id: 'bf7e2f1216ef48b7b697bc454b6eb3cd'
                        key: {
                            endpoint: 'x_snc_wdf_advisory_incident_manager.do'
                        }
                    },
                    {
                        table: 'sn_glider_source_artifact_m2m'
                        id: 'e7c95aa794be42d9b46861eb70951387'
                        key: {
                            application_file: '81d4fb23973a49daadcd6d57bb855908'
                            source_artifact: '338558159419428d94d42cb863910bd3'
                        }
                    },
                ]
            }
        }
    }
}
