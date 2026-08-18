import '@servicenow/sdk/global'

declare global {
    namespace Now {
        namespace Internal {
            interface Keys extends KeysRegistry {
                explicit: {
                    '140910412f3a4f50809dea3fafa4e360': {
                        table: 'sys_cs_context_profile_skill'
                        id: '140910412f3a4f50809dea3fafa4e360'
                    }
                    '41a477502f76cf10809dea3fafa4e31d': {
                        table: 'sn_diagram_builder_instance'
                        id: '41a477502f76cf10809dea3fafa4e31d'
                    }
                    '43e3648d2f3e4f50809dea3fafa4e31b': {
                        table: 'sys_generative_ai_config'
                        id: '43e3648d2f3e4f50809dea3fafa4e31b'
                    }
                    '4b138b102ffe4f10809dea3fafa4e32c': {
                        table: 'sys_scope_privilege'
                        id: '4b138b102ffe4f10809dea3fafa4e32c'
                    }
                    '73a12c8d2ffa4f50809dea3fafa4e368': {
                        table: 'sys_generative_ai_config'
                        id: '73a12c8d2ffa4f50809dea3fafa4e368'
                    }
                    '87138b102ffe4f10809dea3fafa4e324': {
                        table: 'sys_scope_privilege'
                        id: '87138b102ffe4f10809dea3fafa4e324'
                    }
                    '88815bf628d740a98699c384e65be35e': {
                        table: 'sys_one_extend_definition_attribute'
                        id: '88815bf628d740a98699c384e65be35e'
                        deleted: true
                    }
                    '8b138b102ffe4f10809dea3fafa4e328': {
                        table: 'sys_scope_privilege'
                        id: '8b138b102ffe4f10809dea3fafa4e328'
                    }
                    '920c4dc12f7e8f50809dea3fafa4e371': {
                        table: 'sys_scope_privilege'
                        id: '920c4dc12f7e8f50809dea3fafa4e371'
                    }
                    '9c0534452f368f50809dea3fafa4e3f8': {
                        table: 'sys_scope_privilege'
                        id: '9c0534452f368f50809dea3fafa4e3f8'
                    }
                    a94ed1812f76cf50809dea3fafa4e3a2: {
                        table: 'sn_diagram_builder_instance'
                        id: 'a94ed1812f76cf50809dea3fafa4e3a2'
                    }
                    b95417d82fb68f10809dea3fafa4e318: {
                        table: 'sys_scope_privilege'
                        id: 'b95417d82fb68f10809dea3fafa4e318'
                    }
                    bom_json: {
                        table: 'sys_module'
                        id: 'c16864aed60b45e4b28d81338a6659d5'
                    }
                    'checklist-create-acl': {
                        table: 'sys_security_acl'
                        id: '17b88dc676dc435fb06c739fdf7c2849'
                    }
                    'checklist-delete-acl': {
                        table: 'sys_security_acl'
                        id: 'f95677c6ffb648059b550d0ec3ab733e'
                    }
                    'checklist-read-acl': {
                        table: 'sys_security_acl'
                        id: '5c95094fc6db46cf82c3de41c497789e'
                    }
                    'checklist-write-acl': {
                        table: 'sys_security_acl'
                        id: 'a3bc013447ec4eeb9ebc513cc205dab4'
                    }
                    'cl-anomaly-detection': {
                        table: 'x_snc_wdf_advisory_checklist'
                        id: 'c14876162c84458d8f08d5e4373dfd1b'
                    }
                    'cl-audit-logging': {
                        table: 'x_snc_wdf_advisory_checklist'
                        id: '9f0f0658446941a0999f84e4a51773c6'
                    }
                    'cl-break-glass': {
                        table: 'x_snc_wdf_advisory_checklist'
                        id: 'dc3b2aa206834ef38c2a7df94fccbc08'
                    }
                    'cl-capacity-planning': {
                        table: 'x_snc_wdf_advisory_checklist'
                        id: '9f3d6af5b9894e6985aeb9f525a16c8b'
                    }
                    'cl-cert-management': {
                        table: 'x_snc_wdf_advisory_checklist'
                        id: '16bfa1a93d81401a9b5ac2c6b833326c'
                    }
                    'cl-circuit-breaker': {
                        table: 'x_snc_wdf_advisory_checklist'
                        id: 'cacb2a0b84f84380907c23da34c980fc'
                    }
                    'cl-connection-pooling': {
                        table: 'x_snc_wdf_advisory_checklist'
                        id: '2e69675bb0b347e3a684d5b94d86a62d'
                    }
                    'cl-consumer-groups': {
                        table: 'x_snc_wdf_advisory_checklist'
                        id: '4bb5fb096f82462f9b3a386abeaeb26a'
                    }
                    'cl-credential-rotation': {
                        table: 'x_snc_wdf_advisory_checklist'
                        id: '60e30e7f5e784e32a9f9833a0f2b72e1'
                    }
                    'cl-credentials-stored': {
                        table: 'x_snc_wdf_advisory_checklist'
                        id: '6fdc4ac11a94425e8e56c40bcae56ccf'
                    }
                    'cl-cross-border-transfer': {
                        table: 'x_snc_wdf_advisory_checklist'
                        id: '74e864b8d539460582a9629d306abe8e'
                    }
                    'cl-data-classification': {
                        table: 'x_snc_wdf_advisory_checklist'
                        id: '125b936f3f02485680e1728a63e461fc'
                    }
                    'cl-data-residency-mapped': {
                        table: 'x_snc_wdf_advisory_checklist'
                        id: 'fa4c20f178fa4c50a285a3d2574bf066'
                    }
                    'cl-dns-resolution': {
                        table: 'x_snc_wdf_advisory_checklist'
                        id: 'c811cc95df0b45debd6a3b00e5451654'
                    }
                    'cl-failover-testing': {
                        table: 'x_snc_wdf_advisory_checklist'
                        id: '1e7f1d49a0d44e89a30f27464d4de6b8'
                    }
                    'cl-firewall-rules': {
                        table: 'x_snc_wdf_advisory_checklist'
                        id: 'c99f1ff37c074eea920795201958d94b'
                    }
                    'cl-gdpr-dpia': {
                        table: 'x_snc_wdf_advisory_checklist'
                        id: '8f00e2d499cd4404b876ffa456870537'
                    }
                    'cl-health-dashboards': {
                        table: 'x_snc_wdf_advisory_checklist'
                        id: '78355d75ca8e4fb3849c773212580ead'
                    }
                    'cl-hipaa-baa': {
                        table: 'x_snc_wdf_advisory_checklist'
                        id: '29c9b90b99da4d5e9d75af75deeee6ae'
                    }
                    'cl-incident-response': {
                        table: 'x_snc_wdf_advisory_checklist'
                        id: 'ffbdeffd5a0e44cabcac2aee3da223fc'
                    }
                    'cl-least-privilege': {
                        table: 'x_snc_wdf_advisory_checklist'
                        id: '1d53f8a33a82409194fe37f8721b3a5e'
                    }
                    'cl-log-retention': {
                        table: 'x_snc_wdf_advisory_checklist'
                        id: '5c4b5584fab544128bf5bce966ad0b8f'
                    }
                    'cl-mfa-admin': {
                        table: 'x_snc_wdf_advisory_checklist'
                        id: '60c5311d06654b42b2e823f3e681eba6'
                    }
                    'cl-mid-server-cluster': {
                        table: 'x_snc_wdf_advisory_checklist'
                        id: 'ea9699771c984051b7dbb4833b2e6913'
                    }
                    'cl-mid-server-deployed': {
                        table: 'x_snc_wdf_advisory_checklist'
                        id: '7516d0bfb6f84fa1b27e230619c7613f'
                    }
                    'cl-network-latency': {
                        table: 'x_snc_wdf_advisory_checklist'
                        id: '3573e0a9c19a4cc8b88a76c737527b65'
                    }
                    'cl-oauth-configured': {
                        table: 'x_snc_wdf_advisory_checklist'
                        id: '49bc4c1b29b447c6ae2fc5bf991f2346'
                    }
                    'cl-pci-dss': {
                        table: 'x_snc_wdf_advisory_checklist'
                        id: '9e00a021a7d84c0f82c9dc5d57ab749b'
                    }
                    'cl-privacy-by-design': {
                        table: 'x_snc_wdf_advisory_checklist'
                        id: '0894a7fa73dc4325b237128c4b3b7952'
                    }
                    'cl-query-baselines': {
                        table: 'x_snc_wdf_advisory_checklist'
                        id: '56d177efe3d843dba8085911afba4f62'
                    }
                    'cl-rate-limiting': {
                        table: 'x_snc_wdf_advisory_checklist'
                        id: '2fab32d0229f461ab68009e70854c521'
                    }
                    'cl-rbac-defined': {
                        table: 'x_snc_wdf_advisory_checklist'
                        id: '1fdabc748b91460eb532624a66aeea99'
                    }
                    'cl-sox-control': {
                        table: 'x_snc_wdf_advisory_checklist'
                        id: '082dce044560482fba7946cade23c01b'
                    }
                    'cl-tamper-evident': {
                        table: 'x_snc_wdf_advisory_checklist'
                        id: '9657587543d04506b0b934c1dc893daa'
                    }
                    'connector-external-content': {
                        table: 'x_snc_wdf_advisory_connector'
                        id: '79427602f8994705a59ed1b913f31201'
                    }
                    'connector-integration-hub': {
                        table: 'x_snc_wdf_advisory_connector'
                        id: 'fdbb49378bcd42428221664527091548'
                    }
                    'connector-live-connect': {
                        table: 'x_snc_wdf_advisory_connector'
                        id: '3437b20749c84713b87a47df944a4647'
                    }
                    'connector-mcp-client': {
                        table: 'x_snc_wdf_advisory_connector'
                        id: '34a6c896ab2a4e679ef9c06cf16599dc'
                    }
                    'connector-mcp-server': {
                        table: 'x_snc_wdf_advisory_connector'
                        id: 'a926eb3b2cf94b009fba9f1bf0690ac5'
                    }
                    'connector-stream-connect': {
                        table: 'x_snc_wdf_advisory_connector'
                        id: 'd667a9792ad8451181a2f48f5b81e63d'
                    }
                    'connector-zcc': {
                        table: 'x_snc_wdf_advisory_connector'
                        id: '39f8fa93cbe447aebae3dd30feb89d7d'
                    }
                    'connector-zcc-erp': {
                        table: 'x_snc_wdf_advisory_connector'
                        id: 'ce0fba12aade4d86bb3104ffefbc21d3'
                    }
                    'demo-ar': {
                        table: 'x_snc_wdf_advisory_scn_demo'
                        id: '7aa3057a39644768bbbe36c6bf74c823'
                    }
                    'demo-fraud': {
                        table: 'x_snc_wdf_advisory_scn_demo'
                        id: 'c2fc95e23a5b41acad682c9f89deec96'
                    }
                    'demo-hrsd-pay': {
                        table: 'x_snc_wdf_advisory_scn_demo'
                        id: '97511f9d58644378a157d8774ec12239'
                    }
                    'demo-ih': {
                        table: 'x_snc_wdf_advisory_scn_demo'
                        id: 'fe5b26fb01ea4f04b027bb495734e096'
                    }
                    'demo-sox': {
                        table: 'x_snc_wdf_advisory_scn_demo'
                        id: 'a1b49a74e12f4f87931cd8faf21bb7a1'
                    }
                    'demo-stream': {
                        table: 'x_snc_wdf_advisory_scn_demo'
                        id: 'd04d3b102d5b41a2957d2c7c8a2d3865'
                    }
                    'demo-zcc-sql': {
                        table: 'x_snc_wdf_advisory_scn_demo'
                        id: '453c0f59608e43869ef966a07a624f1f'
                    }
                    ee8228052f3e4f50809dea3fafa4e372: {
                        table: 'sys_generative_ai_config'
                        id: 'ee8228052f3e4f50809dea3fafa4e372'
                        deleted: true
                    }
                    fe1383102ffe4f10809dea3fafa4e39f: {
                        table: 'sys_scope_privilege'
                        id: 'fe1383102ffe4f10809dea3fafa4e39f'
                    }
                    package_json: {
                        table: 'sys_module'
                        id: 'e49478fc6fa54071a132960b6552fac1'
                    }
                    'pat-bi-directional': {
                        table: 'x_snc_wdf_advisory_arch_pat'
                        id: '17d6696093c9452c9460d21ffd2a0cd1'
                    }
                    'pat-content-index': {
                        table: 'x_snc_wdf_advisory_arch_pat'
                        id: '8944da2ead3b4df983d682b8feb55152'
                    }
                    'pat-event-driven': {
                        table: 'x_snc_wdf_advisory_arch_pat'
                        id: '89cab2a674cc404e8d1e382951614f6a'
                    }
                    'pat-federated-query': {
                        table: 'x_snc_wdf_advisory_arch_pat'
                        id: 'e54f74fed02e4508a892b43140a408bf'
                    }
                    'pat-realtime-enrich': {
                        table: 'x_snc_wdf_advisory_arch_pat'
                        id: '76ed13c7a542484e9da4edb69ad03488'
                    }
                    'persona-admin': {
                        table: 'x_snc_wdf_advisory_persona'
                        id: '11ce320abbab4f67a4813fb47ddfe184'
                    }
                    'persona-builder-dev': {
                        table: 'x_snc_wdf_advisory_persona'
                        id: 'd19ee44fb6a94c1780bdb6a0f94d9a4f'
                    }
                    'persona-business': {
                        table: 'x_snc_wdf_advisory_persona'
                        id: '5ec51ce2c0084a478eeda5bd8004a264'
                    }
                    PersonaVisibility: {
                        table: 'sys_script_include'
                        id: 'df626f3758df485b98e843a17c1a9e2c'
                    }
                    'src_server_rest_ai-generate-usecases_js': {
                        table: 'sys_module'
                        id: '28961388af2f46c897202c6e959072a7'
                    }
                    'src_server_rest_ai-recommend_js': {
                        table: 'sys_module'
                        id: '26aab053fd02424db21ca3e81d823275'
                    }
                    'src_server_rest_instance-assess_js': {
                        table: 'sys_module'
                        id: '500dac06dc6d4370987bd5813cf18930'
                    }
                    'src_server_rest_web-search_js': {
                        table: 'sys_module'
                        id: '7c815515afb8401da359fcde23a43137'
                    }
                    'src_server_script-includes_persona-visibility_js': {
                        table: 'sys_module'
                        id: '8b91c853b3264e0d8a165b69f6adb898'
                    }
                    'step-ar-1': {
                        table: 'x_snc_wdf_advisory_demo_step'
                        id: 'bad08eb79083439b8f6fcffe4b1569b3'
                    }
                    'step-ar-2': {
                        table: 'x_snc_wdf_advisory_demo_step'
                        id: '7434c63aade749c28d24462fa3032eda'
                    }
                    'step-ar-3': {
                        table: 'x_snc_wdf_advisory_demo_step'
                        id: '2d38fd70c74c4b07a206a0ec89b4dc3d'
                    }
                    'step-ar-4': {
                        table: 'x_snc_wdf_advisory_demo_step'
                        id: '1ec13f2c29db4065a8379d61fe26ea81'
                    }
                    'step-fraud-1': {
                        table: 'x_snc_wdf_advisory_demo_step'
                        id: '79ef020539e94a21afe2c444c2f3bb8b'
                    }
                    'step-fraud-2': {
                        table: 'x_snc_wdf_advisory_demo_step'
                        id: 'b9be572f29d2414f94d44ca8ddf17203'
                    }
                    'step-fraud-3': {
                        table: 'x_snc_wdf_advisory_demo_step'
                        id: 'bfcf8afe8a324f63ab827d6423d672e2'
                    }
                    'step-fraud-4': {
                        table: 'x_snc_wdf_advisory_demo_step'
                        id: '1dad3d2051014b8ebd53aa87eafafe57'
                    }
                    'step-hrsd-1': {
                        table: 'x_snc_wdf_advisory_demo_step'
                        id: 'fa6f242eb67643bda3ef3a164c3d6765'
                    }
                    'step-hrsd-2': {
                        table: 'x_snc_wdf_advisory_demo_step'
                        id: 'f193782108b049aca61c33f4ef35be65'
                    }
                    'step-hrsd-3': {
                        table: 'x_snc_wdf_advisory_demo_step'
                        id: '437e211a4dd746a8b34bf319801fd42d'
                    }
                    'step-hrsd-4': {
                        table: 'x_snc_wdf_advisory_demo_step'
                        id: '82c1d740246944b19e7e56150cfeb098'
                    }
                    'step-ih-1': {
                        table: 'x_snc_wdf_advisory_demo_step'
                        id: '7d12c375df5b4876b65d9c323a7d3574'
                    }
                    'step-ih-2': {
                        table: 'x_snc_wdf_advisory_demo_step'
                        id: 'af56e52ad7924874bfaf5417f68795cc'
                    }
                    'step-ih-3': {
                        table: 'x_snc_wdf_advisory_demo_step'
                        id: '518cce20b85545cfafe4dba0482d9560'
                    }
                    'step-ih-4': {
                        table: 'x_snc_wdf_advisory_demo_step'
                        id: '3234fabfc7b44e13913c5b445994f614'
                    }
                    'step-stream-1': {
                        table: 'x_snc_wdf_advisory_demo_step'
                        id: '8f70419b237f471e8a603ca7cc3c1db1'
                    }
                    'step-stream-2': {
                        table: 'x_snc_wdf_advisory_demo_step'
                        id: '7b05a011cbfe41f4b39daf38ae23c6f8'
                    }
                    'step-stream-3': {
                        table: 'x_snc_wdf_advisory_demo_step'
                        id: '523f08b1a8474253b335dab786c6a676'
                    }
                    'step-stream-4': {
                        table: 'x_snc_wdf_advisory_demo_step'
                        id: 'f9a7027cfe8d47c4a776813608425409'
                    }
                    'step-zcc-sql-1': {
                        table: 'x_snc_wdf_advisory_demo_step'
                        id: '6c68b380474c41bb8e848f0a2e086b66'
                    }
                    'step-zcc-sql-2': {
                        table: 'x_snc_wdf_advisory_demo_step'
                        id: 'bf1e8ac9c15e4e73b78b69e323ba0c65'
                    }
                    'step-zcc-sql-3': {
                        table: 'x_snc_wdf_advisory_demo_step'
                        id: 'dc99661c82b74857a878363c88cf15f8'
                    }
                    'step-zcc-sql-4': {
                        table: 'x_snc_wdf_advisory_demo_step'
                        id: 'f5d469f261db48098742d2862cb9384b'
                    }
                    'uc-ar-aging': {
                        table: 'x_snc_wdf_advisory_use_case'
                        id: 'c472ebff3b8f44c6ac4a2c359a827c98'
                        deleted: true
                    }
                    'uc-asset-inventory': {
                        table: 'x_snc_wdf_advisory_use_case'
                        id: '0ae5f95f7bd7493dac006634de96271a'
                        deleted: true
                    }
                    'uc-cloud-cmdb': {
                        table: 'x_snc_wdf_advisory_use_case'
                        id: '9967799944d845378e1ad692736898cc'
                        deleted: true
                    }
                    'uc-employee-onboard': {
                        table: 'x_snc_wdf_advisory_use_case'
                        id: '94fe82610d3b494ba425ca42ada11545'
                        deleted: true
                    }
                    'uc-energy-grid': {
                        table: 'x_snc_wdf_advisory_use_case'
                        id: 'f6ce707c7f54477684c090ac0bbe95b3'
                        deleted: true
                    }
                    'uc-fraud-detection': {
                        table: 'x_snc_wdf_advisory_use_case'
                        id: '1edc4d9c67ea46dfab46e4527dca48b1'
                        deleted: true
                    }
                    'uc-gov-citizen': {
                        table: 'x_snc_wdf_advisory_use_case'
                        id: '6abf9c1c56fa4d3abdd1f57e3f0c168c'
                        deleted: true
                    }
                    'uc-iot-telemetry': {
                        table: 'x_snc_wdf_advisory_use_case'
                        id: '9fe7afe864dd405fa944f8556c6621bc'
                        deleted: true
                    }
                    'uc-jira-bi-sync': {
                        table: 'x_snc_wdf_advisory_use_case'
                        id: '7e89a1f5b48846c8b054cbd9f8cd022a'
                        deleted: true
                    }
                    'uc-knowledge-unify': {
                        table: 'x_snc_wdf_advisory_use_case'
                        id: '0a8518f106444af59871bd4fb40d9b08'
                        deleted: true
                    }
                    'uc-manufacturing-bottleneck': {
                        table: 'x_snc_wdf_advisory_use_case'
                        id: '755d8ffcc0634906894b5139bd489744'
                    }
                    'uc-mcp-agent-tools': {
                        table: 'x_snc_wdf_advisory_use_case'
                        id: '22626a9007e4476c92627e3b442f2426'
                        deleted: true
                    }
                    'uc-patient-records': {
                        table: 'x_snc_wdf_advisory_use_case'
                        id: '5155cc8f672a4a1ba1392953442f9e25'
                        deleted: true
                    }
                    'uc-payroll-visibility': {
                        table: 'x_snc_wdf_advisory_use_case'
                        id: 'ad96c16c701d4d6480378441a47e5f44'
                        deleted: true
                    }
                    'uc-product-issue-repo': {
                        table: 'x_snc_wdf_advisory_use_case'
                        id: '69fd6f72bf8f4128baa4cfff242b40a1'
                    }
                    'uc-product-issue-tracking': {
                        table: 'x_snc_wdf_advisory_use_case'
                        id: '1b2081c63d8d4c3e99729a53b177238b'
                    }
                    'uc-regulatory-report': {
                        table: 'x_snc_wdf_advisory_use_case'
                        id: '41fcf8de4e264813a8d40bd35819a1c1'
                        deleted: true
                    }
                    'uc-retail-inventory': {
                        table: 'x_snc_wdf_advisory_use_case'
                        id: '993e19f33b6f4ca18ccefdb7b5f6b033'
                        deleted: true
                    }
                    'uc-sales-order-mgmt': {
                        table: 'x_snc_wdf_advisory_use_case'
                        id: '62034f4f48c1460e955efce04a7117b1'
                    }
                    'uc-security-events': {
                        table: 'x_snc_wdf_advisory_use_case'
                        id: '2deb5e59739f4c059e04ad46bad57f2b'
                        deleted: true
                    }
                    'uc-shipment-anomaly': {
                        table: 'x_snc_wdf_advisory_use_case'
                        id: 'd8a111b3a1c54b419b5d81fa66304d10'
                    }
                    'uc-sox-audit': {
                        table: 'x_snc_wdf_advisory_use_case'
                        id: '3ea0417da0fc41b19a1ea76779cb77b7'
                        deleted: true
                    }
                    'uc-supply-chain': {
                        table: 'x_snc_wdf_advisory_use_case'
                        id: '81fef3110d9743b68874263ba474af54'
                        deleted: true
                    }
                    'uc-telecom-network': {
                        table: 'x_snc_wdf_advisory_use_case'
                        id: '91a103cd8bde4b29a1925adb8f10be68'
                        deleted: true
                    }
                    'uc-three-sap-workflows': {
                        table: 'x_snc_wdf_advisory_use_case'
                        id: 'c5a62961d0e74c25b9214d4a606b3663'
                    }
                    'uc-vendor-onboarding': {
                        table: 'x_snc_wdf_advisory_use_case'
                        id: 'e269cc5fe713401e8cc2aa15aede939d'
                    }
                    'uc-vendor-risk': {
                        table: 'x_snc_wdf_advisory_use_case'
                        id: '9026c95dc7b44af8b068a9cb41481f66'
                        deleted: true
                    }
                    'use-case-create-acl': {
                        table: 'sys_security_acl'
                        id: '8c64dd5a7e4f441ebd86aebf6e9a6365'
                    }
                    'use-case-delete-acl': {
                        table: 'sys_security_acl'
                        id: 'd70db3ea36d74ba29f1b33fbf3a85859'
                    }
                    'use-case-read-acl': {
                        table: 'sys_security_acl'
                        id: '8e2b76c305074214b0dabc894e01e901'
                    }
                    'use-case-write-acl': {
                        table: 'sys_security_acl'
                        id: '7ecbd73409634068a2504f6341a43c51'
                    }
                    'vis-admin_dashboard-blocker_count-admin': {
                        table: 'x_snc_wdf_advisory_vis_rule'
                        id: '5eae535af35d48f9a3014eb4e3e42f97'
                    }
                    'vis-admin_dashboard-blocker_count-business': {
                        table: 'x_snc_wdf_advisory_vis_rule'
                        id: '92bf44d65819498ca7902099ffc57911'
                    }
                    'vis-admin_dashboard-blocker_count-technical': {
                        table: 'x_snc_wdf_advisory_vis_rule'
                        id: '5a114b450b564b4f9964599a8b8a7324'
                    }
                    'vis-admin_dashboard-compliance_checklist-admin': {
                        table: 'x_snc_wdf_advisory_vis_rule'
                        id: 'b67cb4a4571344fda3f5f261e1cd5dd9'
                    }
                    'vis-admin_dashboard-compliance_checklist-business': {
                        table: 'x_snc_wdf_advisory_vis_rule'
                        id: '01b67bd85cc84824877a4296de9c0c52'
                    }
                    'vis-admin_dashboard-compliance_checklist-technical': {
                        table: 'x_snc_wdf_advisory_vis_rule'
                        id: '4a98a9e276604bb6b196063925dd808e'
                    }
                    'vis-admin_dashboard-infra_checklist-admin': {
                        table: 'x_snc_wdf_advisory_vis_rule'
                        id: 'bfd95009f6ef4250821cb9911adeefbe'
                    }
                    'vis-admin_dashboard-infra_checklist-business': {
                        table: 'x_snc_wdf_advisory_vis_rule'
                        id: 'e138256c40a34d9b822c6fc2823de064'
                    }
                    'vis-admin_dashboard-infra_checklist-technical': {
                        table: 'x_snc_wdf_advisory_vis_rule'
                        id: '62509a7654d14f2885565faf85b4093f'
                    }
                    'vis-admin_dashboard-readiness_summary-admin': {
                        table: 'x_snc_wdf_advisory_vis_rule'
                        id: '8fd107a928024cda91d522f714b0c7ad'
                    }
                    'vis-admin_dashboard-readiness_summary-business': {
                        table: 'x_snc_wdf_advisory_vis_rule'
                        id: '9345f0c09da4447faa7efee7d72ac7f7'
                    }
                    'vis-admin_dashboard-readiness_summary-technical': {
                        table: 'x_snc_wdf_advisory_vis_rule'
                        id: '32d26adbcade40ada1586a2c94b1abdf'
                    }
                    'vis-connector_detail-auth_method-admin': {
                        table: 'x_snc_wdf_advisory_vis_rule'
                        id: '0dca532de0924b6b8208779855f0b7e2'
                    }
                    'vis-connector_detail-auth_method-business': {
                        table: 'x_snc_wdf_advisory_vis_rule'
                        id: '035863a3ea664abe9faf812044cabc18'
                    }
                    'vis-connector_detail-auth_method-technical': {
                        table: 'x_snc_wdf_advisory_vis_rule'
                        id: '33b9dd83bd0a412da74cf298f65a48f1'
                    }
                    'vis-connector_detail-best_for-admin': {
                        table: 'x_snc_wdf_advisory_vis_rule'
                        id: 'fee8b7e308e1424092064932b1f1b7a8'
                    }
                    'vis-connector_detail-best_for-business': {
                        table: 'x_snc_wdf_advisory_vis_rule'
                        id: '30918855ad954c808b43383e11b2317e'
                    }
                    'vis-connector_detail-best_for-technical': {
                        table: 'x_snc_wdf_advisory_vis_rule'
                        id: '428d881333cf4c4cabb17137969feafc'
                    }
                    'vis-connector_detail-compliance_note-admin': {
                        table: 'x_snc_wdf_advisory_vis_rule'
                        id: '99740f9210b445c7b51861fdbc54a6b1'
                    }
                    'vis-connector_detail-compliance_note-business': {
                        table: 'x_snc_wdf_advisory_vis_rule'
                        id: 'e38af7553e8e4327a6293f7198fb90e7'
                    }
                    'vis-connector_detail-compliance_note-technical': {
                        table: 'x_snc_wdf_advisory_vis_rule'
                        id: 'fe47445d808f48cfab3be57f659e0492'
                    }
                    'vis-connector_detail-data_flow-admin': {
                        table: 'x_snc_wdf_advisory_vis_rule'
                        id: '067882230a5147b2835c31ffe4823062'
                    }
                    'vis-connector_detail-data_flow-business': {
                        table: 'x_snc_wdf_advisory_vis_rule'
                        id: 'b72c79d45cab404b8a8141168eef3a67'
                    }
                    'vis-connector_detail-data_flow-technical': {
                        table: 'x_snc_wdf_advisory_vis_rule'
                        id: 'f4c99ab605554f2f93fc514608972075'
                    }
                    'vis-connector_detail-detail-admin': {
                        table: 'x_snc_wdf_advisory_vis_rule'
                        id: '868b78b85d2d4d9d9587c21374aec236'
                    }
                    'vis-connector_detail-detail-business': {
                        table: 'x_snc_wdf_advisory_vis_rule'
                        id: '43433fc81ca74b1a9795b29bf4957223'
                    }
                    'vis-connector_detail-detail-technical': {
                        table: 'x_snc_wdf_advisory_vis_rule'
                        id: 'f31d0f88a09647d3ad2342e63047e6a5'
                    }
                    'vis-connector_detail-lab_exercise-admin': {
                        table: 'x_snc_wdf_advisory_vis_rule'
                        id: '86ab68bddf8a4baf903e0733f1cfb3a8'
                    }
                    'vis-connector_detail-lab_exercise-business': {
                        table: 'x_snc_wdf_advisory_vis_rule'
                        id: '1b6ed98e4e694f94a962cbacea040c53'
                    }
                    'vis-connector_detail-lab_exercise-technical': {
                        table: 'x_snc_wdf_advisory_vis_rule'
                        id: '9277d72a796140cf92ac219c171c38b8'
                    }
                    'vis-connector_detail-latency-admin': {
                        table: 'x_snc_wdf_advisory_vis_rule'
                        id: 'b65d4ae1f5224d968995f78a3b9915cd'
                    }
                    'vis-connector_detail-latency-business': {
                        table: 'x_snc_wdf_advisory_vis_rule'
                        id: '63d3771e5b8242d383830631358d5803'
                    }
                    'vis-connector_detail-latency-technical': {
                        table: 'x_snc_wdf_advisory_vis_rule'
                        id: 'c580690f406b47d982f76c32e9c11b34'
                    }
                    'vis-connector_detail-mid_server-admin': {
                        table: 'x_snc_wdf_advisory_vis_rule'
                        id: '405ed5508ed048bfb0fa2de7afd977a0'
                    }
                    'vis-connector_detail-mid_server-business': {
                        table: 'x_snc_wdf_advisory_vis_rule'
                        id: '89d58a0b38d54defa5603408e4724a95'
                    }
                    'vis-connector_detail-mid_server-technical': {
                        table: 'x_snc_wdf_advisory_vis_rule'
                        id: '80027058c2684fda9991ead25b68029d'
                    }
                    'vis-connector_detail-not_for-admin': {
                        table: 'x_snc_wdf_advisory_vis_rule'
                        id: '3fbdbef9dc334586b4a6aaf78d60ce8f'
                    }
                    'vis-connector_detail-not_for-business': {
                        table: 'x_snc_wdf_advisory_vis_rule'
                        id: '8e5aea07fbea44a69eac4e51dee1ca14'
                    }
                    'vis-connector_detail-not_for-technical': {
                        table: 'x_snc_wdf_advisory_vis_rule'
                        id: '87a3560caf0946a09aa83a0881fabb61'
                    }
                    'vis-connector_detail-pricing_calculator-admin': {
                        table: 'x_snc_wdf_advisory_vis_rule'
                        id: 'd25d70e3b4894b12b5e3be62e5bcc121'
                    }
                    'vis-connector_detail-pricing_calculator-business': {
                        table: 'x_snc_wdf_advisory_vis_rule'
                        id: '34e8d2c07e2d484ab52ea29d0b469089'
                    }
                    'vis-connector_detail-pricing_calculator-technical': {
                        table: 'x_snc_wdf_advisory_vis_rule'
                        id: 'cbf5b7214fea4af29b865abe3bc9dfad'
                    }
                    'vis-connector_detail-protocol-admin': {
                        table: 'x_snc_wdf_advisory_vis_rule'
                        id: 'b02af6a499a14e6db0e910c237e2c3f8'
                    }
                    'vis-connector_detail-protocol-business': {
                        table: 'x_snc_wdf_advisory_vis_rule'
                        id: '96ec3d943cc948e4935100c012343a77'
                    }
                    'vis-connector_detail-protocol-technical': {
                        table: 'x_snc_wdf_advisory_vis_rule'
                        id: '1a0e90885d954c7f98b81627367bed85'
                    }
                    'vis-connector_detail-readiness_check-admin': {
                        table: 'x_snc_wdf_advisory_vis_rule'
                        id: 'ec3b21683a8247d5bf4d4e2df1fc262d'
                    }
                    'vis-connector_detail-readiness_check-business': {
                        table: 'x_snc_wdf_advisory_vis_rule'
                        id: '39aac0d1c4b8418b9657c2558b4653ad'
                    }
                    'vis-connector_detail-readiness_check-technical': {
                        table: 'x_snc_wdf_advisory_vis_rule'
                        id: '6cb7a875624d478f91481f451c7bddf2'
                    }
                    'vis-connector_detail-roadmap-admin': {
                        table: 'x_snc_wdf_advisory_vis_rule'
                        id: 'aab25d90984043848d2de2b73ad815a8'
                    }
                    'vis-connector_detail-roadmap-business': {
                        table: 'x_snc_wdf_advisory_vis_rule'
                        id: 'fe02ecbc1fa3456ba85370339ec1f3f8'
                    }
                    'vis-connector_detail-roadmap-technical': {
                        table: 'x_snc_wdf_advisory_vis_rule'
                        id: '718b94df60794cb98e3085b06864e2a3'
                    }
                    'vis-connector_detail-supported_systems-admin': {
                        table: 'x_snc_wdf_advisory_vis_rule'
                        id: '1d6eeafb58944de4bb804569b710b88d'
                    }
                    'vis-connector_detail-supported_systems-business': {
                        table: 'x_snc_wdf_advisory_vis_rule'
                        id: 'f63c8a4a2b4c47048149f732aad81228'
                    }
                    'vis-connector_detail-supported_systems-technical': {
                        table: 'x_snc_wdf_advisory_vis_rule'
                        id: '0dfdf93524ed499dbc35482405dd13b0'
                    }
                    'vis-connector_detail-tagline-admin': {
                        table: 'x_snc_wdf_advisory_vis_rule'
                        id: 'eeefc17d62f04c78a0b3a2f3c279a2c3'
                    }
                    'vis-connector_detail-tagline-business': {
                        table: 'x_snc_wdf_advisory_vis_rule'
                        id: '4a43a95b42c64ae981e8321418a13829'
                    }
                    'vis-connector_detail-tagline-technical': {
                        table: 'x_snc_wdf_advisory_vis_rule'
                        id: 'e8ae6845a13a46ca9a305660afcd403d'
                    }
                    'vis-connector_detail-write_back_risk-admin': {
                        table: 'x_snc_wdf_advisory_vis_rule'
                        id: '6c083c9aaab34051aaa2ab419d863abd'
                    }
                    'vis-connector_detail-write_back_risk-business': {
                        table: 'x_snc_wdf_advisory_vis_rule'
                        id: '426bd6fbf94340d58dd50c1ca3af3b9f'
                    }
                    'vis-connector_detail-write_back_risk-technical': {
                        table: 'x_snc_wdf_advisory_vis_rule'
                        id: 'e960e113982549cf8f7ba58e6508c86b'
                    }
                    'vis-scenario_demo-build_agent-admin': {
                        table: 'x_snc_wdf_advisory_vis_rule'
                        id: 'f4edfc34565042e8b7df8187e76d19c1'
                    }
                    'vis-scenario_demo-build_agent-business': {
                        table: 'x_snc_wdf_advisory_vis_rule'
                        id: 'e6a46a98e30148649df90e0349a6baba'
                    }
                    'vis-scenario_demo-build_agent-technical': {
                        table: 'x_snc_wdf_advisory_vis_rule'
                        id: 'ce3e1944661b4dfbb3221bca71ec67af'
                    }
                    'vis-scenario_demo-context_engine-admin': {
                        table: 'x_snc_wdf_advisory_vis_rule'
                        id: '648bbac661a742f79c530f57bff57d37'
                    }
                    'vis-scenario_demo-context_engine-business': {
                        table: 'x_snc_wdf_advisory_vis_rule'
                        id: 'd9578b4a9a8840f688006d0a3bed410a'
                    }
                    'vis-scenario_demo-context_engine-technical': {
                        table: 'x_snc_wdf_advisory_vis_rule'
                        id: '41dd78787c424ba8b157fb25b70e0bf5'
                    }
                    'vis-scenario_demo-kpis-admin': {
                        table: 'x_snc_wdf_advisory_vis_rule'
                        id: '8faadfe1ce2f4af6822b4b5eadef4cfb'
                    }
                    'vis-scenario_demo-kpis-business': {
                        table: 'x_snc_wdf_advisory_vis_rule'
                        id: '2a05331eab4847b291c163e12e5e17c4'
                    }
                    'vis-scenario_demo-kpis-technical': {
                        table: 'x_snc_wdf_advisory_vis_rule'
                        id: 'e1ea0f057779488ca46f41610787eb8b'
                    }
                    'vis-scenario_demo-llm_prompt-admin': {
                        table: 'x_snc_wdf_advisory_vis_rule'
                        id: 'b95b35ea62f84fb28f7635323215cf86'
                    }
                    'vis-scenario_demo-llm_prompt-business': {
                        table: 'x_snc_wdf_advisory_vis_rule'
                        id: 'e3b8b2fbda5c4e72a943d3a26c65e1c0'
                    }
                    'vis-scenario_demo-llm_prompt-technical': {
                        table: 'x_snc_wdf_advisory_vis_rule'
                        id: '0a046afd1881444b82f4fc9965e1d5f8'
                    }
                    'vis-scenario_demo-panel_data-admin': {
                        table: 'x_snc_wdf_advisory_vis_rule'
                        id: '7a29eb94be5e4f77a35196fadebd66b7'
                    }
                    'vis-scenario_demo-panel_data-business': {
                        table: 'x_snc_wdf_advisory_vis_rule'
                        id: 'a745dd13efb343b8af22430b80a9f0c7'
                    }
                    'vis-scenario_demo-panel_data-technical': {
                        table: 'x_snc_wdf_advisory_vis_rule'
                        id: '29b5c76d8dc5488fa01b2789f51b56e8'
                    }
                    'vis-scenario_demo-resilience_note-admin': {
                        table: 'x_snc_wdf_advisory_vis_rule'
                        id: '2f7a6d612b4b4ab6a1d06d6d2536ff9d'
                    }
                    'vis-scenario_demo-resilience_note-business': {
                        table: 'x_snc_wdf_advisory_vis_rule'
                        id: 'ff74e1bb9d42419da3b8aa9bb139cffe'
                    }
                    'vis-scenario_demo-resilience_note-technical': {
                        table: 'x_snc_wdf_advisory_vis_rule'
                        id: 'd4c5dd49b43648c0ac20ffa2dd9f2f39'
                    }
                    'vis-scenario_demo-step_description-admin': {
                        table: 'x_snc_wdf_advisory_vis_rule'
                        id: 'a10c16d82fb0432cb6e15062760f4a79'
                    }
                    'vis-scenario_demo-step_description-business': {
                        table: 'x_snc_wdf_advisory_vis_rule'
                        id: '44d5296e8df9481fadf0f91edaf054d5'
                    }
                    'vis-scenario_demo-step_description-technical': {
                        table: 'x_snc_wdf_advisory_vis_rule'
                        id: '21021f653349443f823bde136d737403'
                    }
                    'vis-scenario_demo-step_title-admin': {
                        table: 'x_snc_wdf_advisory_vis_rule'
                        id: '8f9d44f39d5d4f51b126b62a2d0dc666'
                    }
                    'vis-scenario_demo-step_title-business': {
                        table: 'x_snc_wdf_advisory_vis_rule'
                        id: 'c7d39faf94d646a79ce4972e086213d5'
                    }
                    'vis-scenario_demo-step_title-technical': {
                        table: 'x_snc_wdf_advisory_vis_rule'
                        id: '89d9730df7fb41838af575d27fee67ab'
                    }
                    'vis-use_case_library-build_notes-admin': {
                        table: 'x_snc_wdf_advisory_vis_rule'
                        id: '0d64e5b21cbf44d6908e6a189c1ec60d'
                    }
                    'vis-use_case_library-build_notes-business': {
                        table: 'x_snc_wdf_advisory_vis_rule'
                        id: '29b8fed2f678489abfea66d24c5c606f'
                    }
                    'vis-use_case_library-build_notes-technical': {
                        table: 'x_snc_wdf_advisory_vis_rule'
                        id: 'c515846ae262424b92bbe9a21554c07c'
                    }
                    'vis-use_case_library-deploy_time-admin': {
                        table: 'x_snc_wdf_advisory_vis_rule'
                        id: '4ecf61b2b44c49e09f5190c334c22a9d'
                    }
                    'vis-use_case_library-deploy_time-business': {
                        table: 'x_snc_wdf_advisory_vis_rule'
                        id: '32422db3b37c441a99f5d8881bc4b73e'
                    }
                    'vis-use_case_library-deploy_time-technical': {
                        table: 'x_snc_wdf_advisory_vis_rule'
                        id: '47ca4671f8c54425ab50b4081446cf18'
                    }
                    'vis-use_case_library-industry-admin': {
                        table: 'x_snc_wdf_advisory_vis_rule'
                        id: '937762903a614aeb9ddf69ce344fec36'
                    }
                    'vis-use_case_library-industry-business': {
                        table: 'x_snc_wdf_advisory_vis_rule'
                        id: 'bad3a64cb50749e79c2600525c510463'
                    }
                    'vis-use_case_library-industry-technical': {
                        table: 'x_snc_wdf_advisory_vis_rule'
                        id: '91664810e4dc40e09c649c214821ef2f'
                    }
                    'vis-use_case_library-otto_description-admin': {
                        table: 'x_snc_wdf_advisory_vis_rule'
                        id: '856a134131aa4cd0a48374e31af1ad67'
                    }
                    'vis-use_case_library-otto_description-business': {
                        table: 'x_snc_wdf_advisory_vis_rule'
                        id: 'a07253b5ed2344fcb29412280e28e078'
                    }
                    'vis-use_case_library-otto_description-technical': {
                        table: 'x_snc_wdf_advisory_vis_rule'
                        id: 'c66e950ef35a4209bab1d45ff8a5f39c'
                    }
                    'vis-use_case_library-playbook_button-admin': {
                        table: 'x_snc_wdf_advisory_vis_rule'
                        id: '53decd6376234321a3ea63af667e14ab'
                    }
                    'vis-use_case_library-playbook_button-business': {
                        table: 'x_snc_wdf_advisory_vis_rule'
                        id: '0d737d9b6933448484a12940ab8b4fda'
                    }
                    'vis-use_case_library-playbook_button-technical': {
                        table: 'x_snc_wdf_advisory_vis_rule'
                        id: '18faae6a43b84963bf9750930fc195ee'
                    }
                    'vis-use_case_library-sources-admin': {
                        table: 'x_snc_wdf_advisory_vis_rule'
                        id: '911f83d2232b41198196eb389c3aea87'
                    }
                    'vis-use_case_library-sources-business': {
                        table: 'x_snc_wdf_advisory_vis_rule'
                        id: 'ee34e5ac92164f3da98189300fb15f81'
                    }
                    'vis-use_case_library-sources-technical': {
                        table: 'x_snc_wdf_advisory_vis_rule'
                        id: 'b7d2860453b34930bca6f16cc0fffffc'
                    }
                    'vis-use_case_library-tier_badge-admin': {
                        table: 'x_snc_wdf_advisory_vis_rule'
                        id: 'bb63db765488425b80b6f90078d33f40'
                    }
                    'vis-use_case_library-tier_badge-business': {
                        table: 'x_snc_wdf_advisory_vis_rule'
                        id: '325f2df2c1a9454589f8e951399eb995'
                    }
                    'vis-use_case_library-tier_badge-technical': {
                        table: 'x_snc_wdf_advisory_vis_rule'
                        id: 'cf9ffb12cb364989b752040b62ba7f63'
                    }
                    'vis-use_case_library-title-admin': {
                        table: 'x_snc_wdf_advisory_vis_rule'
                        id: 'e6ec3f3119fa496b9a3cc52b002eeca5'
                    }
                    'vis-use_case_library-title-business': {
                        table: 'x_snc_wdf_advisory_vis_rule'
                        id: '0caa75b17d334a77ad776956bae57280'
                    }
                    'vis-use_case_library-title-technical': {
                        table: 'x_snc_wdf_advisory_vis_rule'
                        id: '1a79323f983a4cb4acd6d0f4c4a7227c'
                    }
                    wdf_web_search_access: {
                        table: 'sys_security_acl'
                        id: 'ee263a2ae1eb436ab14cd7c4bf30db9c'
                    }
                    wdf_web_search_prompt_v1: {
                        table: 'sys_generative_ai_config'
                        id: 'bc9cbd28a8eb44cca496b5ea5ecbb748'
                    }
                    wdf_web_search_query_input: {
                        table: 'sys_one_extend_definition_attribute'
                        id: '88815bf628d740a98699c384e65be35e'
                    }
                    wdf_web_search_skill: {
                        table: 'sys_one_extend_capability'
                        id: '586e7276b2134fc9be7061b6a911defd'
                    }
                    wdf_web_search_skill__output_error: {
                        table: 'sys_one_extend_definition_attribute'
                        id: '3463e19571154f2eb9e8075f172953e4'
                    }
                    wdf_web_search_skill__output_errorcode: {
                        table: 'sys_one_extend_definition_attribute'
                        id: 'e10c26b7e3cb4c7c89001aa18e412ecd'
                    }
                    wdf_web_search_skill__output_provider: {
                        table: 'sys_one_extend_definition_attribute'
                        id: '1ce2360a4e3c401881c9235c7fee3f55'
                    }
                    wdf_web_search_skill__output_response: {
                        table: 'sys_one_extend_definition_attribute'
                        id: 'a6cf143199554c90befc462a9329d89c'
                    }
                    wdf_web_search_skill__output_status: {
                        table: 'sys_one_extend_definition_attribute'
                        id: '6ee04a6ad1b44c0189d6bbd5c32b5770'
                    }
                    'wdf-ai-generate-usecases-route': {
                        table: 'sys_ws_operation'
                        id: '51774440fae945bab86c7ceed45ca9fc'
                    }
                    'wdf-ai-instance-assess-route': {
                        table: 'sys_ws_operation'
                        id: 'a4f7e584a81c436d8531e0df2be4da1c'
                    }
                    'wdf-ai-recommend-api': {
                        table: 'sys_ws_definition'
                        id: '90f9c46302f14ca0b231048b3f2bc8f3'
                    }
                    'wdf-ai-recommend-route': {
                        table: 'sys_ws_operation'
                        id: 'd5abb1b18e85447f9099ec1fe8a44fa6'
                    }
                    'wdf-ai-web-search-route': {
                        table: 'sys_ws_operation'
                        id: '8d2ad6c318d04127af2e2ef6aef88bb2'
                    }
                }
                composite: [
                    {
                        table: 'sys_one_extend_resource_attribute_mapping'
                        id: '006168c997d649f682dcc6815c1405a5'
                        key: {
                            resource_mapping: {
                                id: '97a230f6d014469fbc8e4149780f8072'
                                key: {
                                    parent_capability: '586e7276b2134fc9be7061b6a911defd'
                                    resource_capability: '5817eb2b9f36121029ead63a6a0a1c7c'
                                    resource_name: 'WebSearch'
                                }
                            }
                            resource_attribute_name: 'ac17ef2b9f36121029ead63a6a0a1ce9'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: '0064f26f976044d9b2181cff7cb81b0a'
                        key: {
                            name: 'x_snc_wdf_advisory_scn_demo'
                        }
                    },
                    {
                        table: 'sys_user_role_contains'
                        id: '009768e6d0bb4fa8afd909ffb3a2a71a'
                        key: {
                            role: {
                                id: '600d58c05beb4fc58527adae4c26db9e'
                                key: {
                                    name: 'x_snc_wdf_advisory.builder_dev'
                                }
                            }
                            contains: {
                                id: '7fc6c5a7e62d4c489d2403de31cc07f7'
                                key: {
                                    name: 'x_snc_wdf_advisory.business_user'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '0118bc9ec5864931aa08e93445f890b1'
                        key: {
                            name: 'x_snc_wdf_advisory_connector'
                            element: 'protocol'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '0214dcab55684cf7bf49c44aecb11b90'
                        key: {
                            name: 'x_snc_wdf_advisory_demo_step'
                            element: 'panel_type'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '02b076984dfa42e2bcc273ee0e43b03a'
                        key: {
                            name: 'x_snc_wdf_advisory_arch_pat'
                            element: 'name'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '040ceeabaf5345228e3fbc417bf7395c'
                        key: {
                            name: 'x_snc_wdf_advisory_persona'
                            element: 'show_pricing'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '0489dd2c32c44df4975fb62766ea0782'
                        key: {
                            name: 'x_snc_wdf_advisory_use_case'
                            element: 'products'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ux_lib_asset'
                        id: '04ed384302854ebeb402abf026edc411'
                        key: {
                            name: 'x_snc_wdf_advisory/vendor-jspdf--b1b2c22a.js.map'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '050ef66238d847df827d4309177e1bc5'
                        key: {
                            name: 'x_snc_wdf_advisory_use_case'
                            element: 'industry'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '058a4a822569463aaaa68b03f56b0d3c'
                        key: {
                            name: 'x_snc_wdf_advisory_demo_step'
                            element: 'step_number'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '064124b8d96c4d6bb5c44f7a7735b2ac'
                        deleted: true
                        key: {
                            name: 'x_snc_wdf_advisory_use_case'
                            element: 'sources'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '06fcf296db48488fb5da5658ee80d878'
                        key: {
                            name: 'x_snc_wdf_advisory_persona'
                            element: 'key'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '07b8686b3ac44b4fad4f9819538289dc'
                        key: {
                            name: 'x_snc_wdf_advisory_persona'
                            element: 'icon'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '09bdf950f67b496db51c9a32fabade67'
                        key: {
                            name: 'x_snc_wdf_advisory_connector'
                            element: 'write_back_note'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '09c02fae7af1485c8ec1006112b906ed'
                        key: {
                            name: 'x_snc_wdf_advisory_checklist'
                            element: 'label'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_one_extend_capability_definition'
                        id: '0a1d6c6a70344b499fb628bb71dd1145'
                        key: {
                            capability: '586e7276b2134fc9be7061b6a911defd'
                            api: '936e514a53b3b110f028ddeeff7b128c'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '0aa0fbffe95846fa95aef3de725c66fc'
                        key: {
                            name: 'x_snc_wdf_advisory_vis_rule'
                            element: 'content_area'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '0e8f7f2786df418c839a8a4b55c818b5'
                        key: {
                            name: 'x_snc_wdf_advisory_use_case'
                            element: 'title'
                        }
                    },
                    {
                        table: 'sn_glider_source_artifact_m2m'
                        id: '0f0fc6174894404f86c6f4ffcba74535'
                        deleted: true
                        key: {
                            application_file: '179e1968c7c24dbca8fa5202fe64b07c'
                            source_artifact: '338558159419428d94d42cb863910bd3'
                        }
                    },
                    {
                        table: 'sys_generative_ai_prompt_config'
                        id: '0fe3648d2f3e4f50809dea3fafa4e31d'
                        key: {
                            ai_config: '43e3648d2f3e4f50809dea3fafa4e31b'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '10fc4ae6a5e74616886e9c214c92c039'
                        key: {
                            name: 'x_snc_wdf_advisory_connector'
                            element: 'status'
                            value: 'not_on_roadmap'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '1194b299f6244091a7ddc31c60ec2e80'
                        key: {
                            name: 'x_snc_wdf_advisory_vis_rule'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '11d825a2f2bc4cb3b07b49f425fc8266'
                        key: {
                            name: 'x_snc_wdf_advisory_connector'
                            element: 'tagline'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '1374bf3a518a4000b7a912ce2c790671'
                        key: {
                            name: 'x_snc_wdf_advisory_connector'
                            element: 'status'
                            value: 'ga'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '13a6f0d6a0b246cd9f05168e5ff540c6'
                        deleted: true
                        key: {
                            name: 'x_snc_wdf_advisory_use_case'
                            element: 'connector'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '155411243ee4403787e5c65a91707730'
                        deleted: true
                        key: {
                            name: 'x_snc_wdf_advisory_use_case'
                            element: 'tier'
                            value: 'land'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '15c5a1f86f47429e8d743fd6e5b37f46'
                        key: {
                            name: 'x_snc_wdf_advisory_checklist'
                            element: 'tag'
                            value: 'required'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_ux_lib_asset'
                        id: '179e1968c7c24dbca8fa5202fe64b07c'
                        deleted: true
                        key: {
                            name: 'x_snc_wdf_advisory/vendor-react-dom--4cdffd9b'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '17c260d50cbb47d6906f64c5bc36b599'
                        key: {
                            name: 'x_snc_wdf_advisory_persona'
                            element: 'show_lab_exercises'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '1ab82603ffe749a98bc8fc93575221e5'
                        key: {
                            name: 'x_snc_wdf_advisory_persona'
                            element: 'subtitle'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '1ae659c530b54df893d8c524ca102c00'
                        key: {
                            name: 'x_snc_wdf_advisory_demo_step'
                            element: 'resilience_note'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '1b1c649d28044294aa3f34d696a556ba'
                        key: {
                            name: 'x_snc_wdf_advisory_use_case'
                            element: 'outcome'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '1c0910412f3a4f50809dea3fafa4e33c'
                        deleted: true
                        key: {
                            document_key: '500910412f3a4f50809dea3fafa4e339'
                            variable: 'f09e3f9893b64210aa5730f16489189f'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '1c0910412f3a4f50809dea3fafa4e34a'
                        deleted: true
                        key: {
                            document_key: '500910412f3a4f50809dea3fafa4e339'
                            variable: '24c14b967fe85210e98d0b583d8665dd'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '1ca4b32c7ed84296a5593316ed5545f5'
                        key: {
                            name: 'x_snc_wdf_advisory_demo_step'
                            element: 'is_final_step'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: '1cf845e25ae54158ba4bd44b89f837ae'
                        key: {
                            name: 'x_snc_wdf_advisory_vis_rule'
                        }
                    },
                    {
                        table: 'sys_one_extend_resource_attribute_mapping'
                        id: '1e7d72c96c0a46ef9389a3370caece7a'
                        key: {
                            resource_mapping: {
                                id: '97a230f6d014469fbc8e4149780f8072'
                                key: {
                                    parent_capability: '586e7276b2134fc9be7061b6a911defd'
                                    resource_capability: '5817eb2b9f36121029ead63a6a0a1c7c'
                                    resource_name: 'WebSearch'
                                }
                            }
                            resource_attribute_name: 'a017ef2b9f36121029ead63a6a0a1cec'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: '1feebb3104b34ad28a2898ea045f389d'
                        key: {
                            name: 'x_snc_wdf_advisory_demo_step'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '2022ad14591f4cd4b56ee6a52902b335'
                        key: {
                            name: 'x_snc_wdf_advisory_checklist'
                            element: 'sub_description'
                        }
                    },
                    {
                        table: 'sys_one_extend_definition_config'
                        id: '2024ca7e5b684141b50348c776ee065e'
                        key: {
                            definition: {
                                id: '0a1d6c6a70344b499fb628bb71dd1145'
                                key: {
                                    capability: '586e7276b2134fc9be7061b6a911defd'
                                    api: '936e514a53b3b110f028ddeeff7b128c'
                                }
                            }
                            capability: '586e7276b2134fc9be7061b6a911defd'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '21442efec2a74ff1aacedd6e1cc34da5'
                        key: {
                            name: 'x_snc_wdf_advisory_connector'
                            element: 'write_back_note'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '2155d28cde6a4544a722a2699a0600b9'
                        deleted: true
                        key: {
                            name: 'x_snc_wdf_advisory_use_case'
                            element: 'industry'
                            value: 'financial_services'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_one_extend_resource_attribute_mapping'
                        id: '2243e4d6dc5443ffbe3abcd821914813'
                        key: {
                            resource_mapping: {
                                id: '97a230f6d014469fbc8e4149780f8072'
                                key: {
                                    parent_capability: '586e7276b2134fc9be7061b6a911defd'
                                    resource_capability: '5817eb2b9f36121029ead63a6a0a1c7c'
                                    resource_name: 'WebSearch'
                                }
                            }
                            resource_attribute_name: '9659ebef9f36121029ead63a6a0a1ce8'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '248fddd2c83e4bf4ac8eae97ed879c65'
                        deleted: true
                        key: {
                            name: 'x_snc_wdf_advisory_use_case'
                            element: 'tier'
                            value: 'expand'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '24e53d9e5c814177b50c82089165d327'
                        key: {
                            name: 'x_snc_wdf_advisory_scn_demo'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '2597816562f74112ade3da6c38b10e9f'
                        key: {
                            name: 'x_snc_wdf_advisory_checklist'
                            element: 'status'
                            value: 'fail'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '271ec339d23d4a55ad648f36c9d3499c'
                        key: {
                            name: 'x_snc_wdf_advisory_persona'
                            element: 'role_name'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '27a44356ec344dc6817dc56d2ab5156f'
                        key: {
                            name: 'x_snc_wdf_advisory_persona'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_one_extend_resource_mapping'
                        id: '28c88fb4b9c34ea38df44368a3cdc0d2'
                        key: {
                            parent_capability: '586e7276b2134fc9be7061b6a911defd'
                            resource_capability: '586e7276b2134fc9be7061b6a911defd'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '2b46cfde69c24cb6bb3a9589942aeb28'
                        key: {
                            name: 'x_snc_wdf_advisory_connector'
                            element: 'best_for'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '2be656d3680345f298e13ab28c0ad27f'
                        deleted: true
                        key: {
                            name: 'x_snc_wdf_advisory_use_case'
                            element: 'sources'
                        }
                    },
                    {
                        table: 'sys_ux_lib_asset'
                        id: '2c38ee11dce044ed964713779fe16aaf'
                        key: {
                            name: 'x_snc_wdf_advisory/purify'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '2c59fd32e8ea425e8aa930724d90d432'
                        key: {
                            name: 'x_snc_wdf_advisory_persona'
                            element: 'show_admin_checklists'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '2d7985849f8b41d8b50211c4a120ec0b'
                        key: {
                            name: 'x_snc_wdf_advisory_arch_pat'
                            element: 'linked_demo'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '2de430bb7692491daab18f5e02511459'
                        key: {
                            name: 'x_snc_wdf_advisory_persona'
                            element: 'show_build_agent'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '2e608ba5d56d4a249cc1e67fdc3b1a21'
                        key: {
                            name: 'x_snc_wdf_advisory_demo_step'
                            element: 'panel_type'
                            value: 'sources'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '2ef1419cb16e4ba3bbec8431d5e7d0ae'
                        key: {
                            name: 'x_snc_wdf_advisory_checklist'
                            element: 'status'
                            value: 'warn'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '30b0f25ab7f74d2bb4663b006fc24f25'
                        key: {
                            name: 'x_snc_wdf_advisory_persona'
                            element: 'role_name'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '3109256e1bc940c89e4b2df0459e305a'
                        deleted: true
                        key: {
                            name: 'x_snc_wdf_advisory_use_case'
                            element: 'build_notes'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sn_glider_source_artifact_m2m'
                        id: '33026252bb3045b7bbb1259c0c29775d'
                        key: {
                            application_file: '941dd75d100248a8aa34400ce8e28146'
                            source_artifact: '49f15c1d38954923a55c6cf548c77af3'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '3364a1f5014147688fd8b8ab160e2bbe'
                        key: {
                            name: 'x_snc_wdf_advisory_arch_pat'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sn_glider_source_artifact'
                        id: '338558159419428d94d42cb863910bd3'
                        deleted: true
                        key: {
                            name: 'x_snc_wdf_advisory_incident_manager.do - BYOUI Files'
                        }
                    },
                    {
                        table: 'sys_one_extend_resource_attribute_mapping'
                        id: '338a2081f5d344ba8f883237b9e6704b'
                        key: {
                            resource_mapping: {
                                id: '97a230f6d014469fbc8e4149780f8072'
                                key: {
                                    parent_capability: '586e7276b2134fc9be7061b6a911defd'
                                    resource_capability: '5817eb2b9f36121029ead63a6a0a1c7c'
                                    resource_name: 'WebSearch'
                                }
                            }
                            resource_attribute_name: 'a417ef2b9f36121029ead63a6a0a1cee'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '338f83eb9a8a482696963d70a2d75c1a'
                        key: {
                            name: 'x_snc_wdf_advisory_persona'
                            element: 'subtitle'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '33bd4d76ef9548168fa660758bc118d4'
                        key: {
                            name: 'x_snc_wdf_advisory_connector'
                            element: 'auth_method'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '33dd1349898e41c1b0abbe4c9e707e79'
                        key: {
                            name: 'x_snc_wdf_advisory_vis_rule'
                            element: 'visible'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '35eb8115dfc74efcace77cde9f5287c5'
                        key: {
                            name: 'x_snc_wdf_advisory_connector'
                            element: 'supports_write_back'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '38354691bb7c4e16a8f411c35158106d'
                        key: {
                            name: 'x_snc_wdf_advisory_arch_pat'
                            element: 'data_flow_steps'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '385c25eecbc4421da683d9443d8a9c26'
                        key: {
                            name: 'x_snc_wdf_advisory_use_case'
                            element: 'external_systems'
                        }
                    },
                    {
                        table: 'sys_agent_access_role_configuration'
                        id: '392d4bbb722b47c69760fa644589135c'
                        key: {
                            agent: '40a8a89f571246dd966d3473e0a2dba7'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '3a50b7db98b84647980b8397863e1681'
                        key: {
                            name: 'x_snc_wdf_advisory_connector'
                            element: 'status'
                            value: 'community'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '3ace3778e4c04aa0baf87599f9be2e23'
                        key: {
                            name: 'x_snc_wdf_advisory_use_case'
                            element: 'line_of_business'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '3bdcdccd065544e68204b3a478722578'
                        key: {
                            name: 'x_snc_wdf_advisory_checklist'
                            element: 'section'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '3be3763591b846e59de26b2ba8356d2c'
                        key: {
                            name: 'x_snc_wdf_advisory_demo_step'
                            element: 'panel_type'
                            value: 'pairs'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: '3df0d0d91a004021808cee2dd34f4378'
                        key: {
                            name: 'x_snc_wdf_advisory_connector'
                            element: 'status'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '3df0d19ca707474b83c0fc9cd8aa12d1'
                        key: {
                            name: 'x_snc_wdf_advisory_connector'
                            element: 'status'
                            value: 'in_development'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '3fa0f55182d34ddb92d4a17fa7d41faa'
                        key: {
                            name: 'x_snc_wdf_advisory_demo_step'
                            element: 'title'
                        }
                    },
                    {
                        table: 'sys_ux_lib_asset'
                        id: '402ce92402fd41f7a9226b9abda703fd'
                        key: {
                            name: 'x_snc_wdf_advisory/index.es.js.map'
                        }
                    },
                    {
                        table: 'sn_nowassist_skill_config'
                        id: '40a8a89f571246dd966d3473e0a2dba7'
                        key: {
                            skill_id: '586e7276b2134fc9be7061b6a911defd'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '4349bed00a7943fd8c3417d1c9a47f1f'
                        key: {
                            sys_security_acl: '17b88dc676dc435fb06c739fdf7c2849'
                            sys_user_role: {
                                id: '4c0e7620e097410e8bc836e2ae9ff617'
                                key: {
                                    name: 'x_snc_wdf_advisory.admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '436de3bf8f6740a48488406741c210a7'
                        key: {
                            name: 'x_snc_wdf_advisory_connector'
                            element: 'keywords'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '4480f6990c3541008bf214a7feaf7c3c'
                        key: {
                            name: 'x_snc_wdf_advisory_arch_pat'
                            element: 'linked_demo'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sn_nowassist_skill_config_var_set'
                        id: '44b12c8d2ffa4f50809dea3fafa4e3a3'
                        deleted: true
                        key: {
                            name: 'Skill config prompts'
                            skill_config: '40a8a89f571246dd966d3473e0a2dba7'
                            config_type: '5a63045793dc1210aa5730f1648918a4'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '4538705c7b584c6a971de36515d70081'
                        key: {
                            name: 'x_snc_wdf_advisory_scn_demo'
                            element: 'connector'
                        }
                    },
                    {
                        table: 'sn_glider_source_artifact'
                        id: '49f15c1d38954923a55c6cf548c77af3'
                        key: {
                            name: 'x_snc_wdf_advisory_home.do - BYOUI Files'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '4aa389ef5bf54ff6b727fcc79933877d'
                        key: {
                            name: 'x_snc_wdf_advisory_connector'
                            element: 'status'
                            value: 'in_backlog'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sn_glider_source_artifact_m2m'
                        id: '4aa65a4be2a54de4a30728c0dc6cc29d'
                        key: {
                            application_file: '94b14339e528432e901cc2d9ac0d4738'
                            source_artifact: '49f15c1d38954923a55c6cf548c77af3'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '4af0540854e7402098bd1f4bfac6514a'
                        key: {
                            name: 'x_snc_wdf_advisory_scn_demo'
                            element: 'title'
                        }
                    },
                    {
                        table: 'sys_user_role'
                        id: '4c0e7620e097410e8bc836e2ae9ff617'
                        key: {
                            name: 'x_snc_wdf_advisory.admin'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '4c1b88cec1cd4572aa01238ebdc64f67'
                        deleted: true
                        key: {
                            name: 'x_snc_wdf_advisory_use_case'
                            element: 'industry'
                            value: 'energy'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '4cdf41cf85b34768836df8c3c3f999e3'
                        key: {
                            name: 'x_snc_wdf_advisory_scn_demo'
                            element: 'connector'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '4e4fe8daf97e4e48b541090f2387dbeb'
                        key: {
                            name: 'x_snc_wdf_advisory_demo_step'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '4f2fb56455b543de9be079c8abf80cd4'
                        key: {
                            name: 'x_snc_wdf_advisory_checklist'
                            element: 'tag'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '4feeab7839b646b2ae8bcb9d770a6f85'
                        key: {
                            name: 'x_snc_wdf_advisory_vis_rule'
                            element: 'persona'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sn_nowassist_skill_config_var_set'
                        id: '500910412f3a4f50809dea3fafa4e339'
                        key: {
                            name: '__delivery_step__'
                            skill_config: '40a8a89f571246dd966d3473e0a2dba7'
                            config_type: '7dfdff5893b64210aa5730f164891837'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '500910412f3a4f50809dea3fafa4e33d'
                        deleted: true
                        key: {
                            document_key: '500910412f3a4f50809dea3fafa4e339'
                            variable: '27b274b97fde9610076726d6ac866550'
                        }
                    },
                    {
                        table: 'sys_ux_lib_asset'
                        id: '502e7fdb80a046d3a35494812f117c93'
                        key: {
                            name: 'x_snc_wdf_advisory/vendor-jspdf--b1b2c22a'
                        }
                    },
                    {
                        table: 'sys_gen_ai_skill_config'
                        id: '51f8d0012f3a4f50809dea3fafa4e327'
                        key: {
                            skill_id: '6fe81ccd2ff64f50809dea3fafa4e3ae'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '52a874419b9f493481c4f2ebc82b8a7a'
                        key: {
                            name: 'x_snc_wdf_advisory_checklist'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '5389655592df41f9bbb5564d3c35672e'
                        key: {
                            name: 'x_snc_wdf_advisory_scn_demo'
                            element: 'query_text'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: '547351431dbc43d18ae66616850829bd'
                        key: {
                            name: 'x_snc_wdf_advisory_checklist'
                            element: 'checklist_type'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '56dafbce5dd54c92b4c7547923048977'
                        key: {
                            name: 'x_snc_wdf_advisory_persona'
                            element: 'show_lab_exercises'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '579c83a3f0024816a551700877f11513'
                        key: {
                            name: 'x_snc_wdf_advisory_scn_demo'
                            element: 'tags'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '579ccb3ad4aa4f319427643260f74de1'
                        key: {
                            name: 'x_snc_wdf_advisory_connector'
                            element: 'status'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '583b56fc5f384587930d99cd65fa4dbb'
                        key: {
                            name: 'x_snc_wdf_advisory_checklist'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '5a22ea33a20e455590f18505778fe9cc'
                        key: {
                            name: 'x_snc_wdf_advisory_checklist'
                            element: 'tag'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '5a4a813ddd8e4bb393bfe1c6f6cbbe0d'
                        key: {
                            name: 'x_snc_wdf_advisory_use_case'
                            element: 'business_problem'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '5a773b25caa4491bb218215687141d0b'
                        key: {
                            name: 'x_snc_wdf_advisory_connector'
                            element: 'mid_server_requirement'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '5b53077d11ea42d1b52cde44c3120854'
                        deleted: true
                        key: {
                            name: 'x_snc_wdf_advisory_use_case'
                            element: 'industry'
                            value: 'government'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '5c427196969b49838baf06ee28b358c4'
                        key: {
                            name: 'x_snc_wdf_advisory_connector'
                            element: 'q4_roadmap'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '5c609b6b700740f088922d6d7bb3182a'
                        key: {
                            name: 'x_snc_wdf_advisory_use_case'
                            element: 'persona'
                        }
                    },
                    {
                        table: 'sys_user_role_contains'
                        id: '5c6624f2908d472a8ca9ed24c1d61d5f'
                        key: {
                            role: {
                                id: '4c0e7620e097410e8bc836e2ae9ff617'
                                key: {
                                    name: 'x_snc_wdf_advisory.admin'
                                }
                            }
                            contains: {
                                id: '7fc6c5a7e62d4c489d2403de31cc07f7'
                                key: {
                                    name: 'x_snc_wdf_advisory.business_user'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '5c9f1199885540339cbdb316ca96fae7'
                        key: {
                            name: 'x_snc_wdf_advisory_demo_step'
                            element: 'resilience_note'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sn_glider_source_artifact_m2m'
                        id: '5cc12ffd65b54efc8f879360e12220d5'
                        deleted: true
                        key: {
                            application_file: 'bf7e2f1216ef48b7b697bc454b6eb3cd'
                            source_artifact: '338558159419428d94d42cb863910bd3'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '5d786306d9984ca88d4559e196617953'
                        key: {
                            name: 'x_snc_wdf_advisory_persona'
                            element: 'active'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '5e0cfb6d2b804bf7a9b543b4d12dd19f'
                        key: {
                            name: 'x_snc_wdf_advisory_demo_step'
                            element: 'panel_type'
                            value: 'connectors'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '5e8d1dca7c974cc191979ed0782d24d9'
                        key: {
                            name: 'x_snc_wdf_advisory_connector'
                            element: 'not_for'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_generative_ai_prompt_config'
                        id: '5f281398d8844a97a3ada461271cf57e'
                        key: {
                            ai_config: 'bc9cbd28a8eb44cca496b5ea5ecbb748'
                        }
                    },
                    {
                        table: 'sys_user_role'
                        id: '600d58c05beb4fc58527adae4c26db9e'
                        key: {
                            name: 'x_snc_wdf_advisory.builder_dev'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '60dad460bd7a4cb5a09a6914e6cc0b90'
                        key: {
                            name: 'x_snc_wdf_advisory_demo_step'
                            element: 'tag_label'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ux_lib_asset'
                        id: '611df4c21d36442fbfc28e824565b268'
                        key: {
                            name: 'x_snc_wdf_advisory/wdf-advisor/main.js.map'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '6455d1d059e8425fb50cfe070de21ac4'
                        key: {
                            name: 'x_snc_wdf_advisory_demo_step'
                            element: 'description'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '645bf5f462b94c80921837999937f13d'
                        deleted: true
                        key: {
                            name: 'x_snc_wdf_advisory_use_case'
                            element: 'connector'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '64af17c9ea624f91bcb9a07c61fecd82'
                        key: {
                            name: 'x_snc_wdf_advisory_persona'
                            element: 'active'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '656237ac67344c8fa4c455c86476142e'
                        key: {
                            name: 'x_snc_wdf_advisory_checklist'
                            element: 'tag'
                            value: 'recommended'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '663fceb89da146c7af60a5dec2cf57e2'
                        key: {
                            name: 'x_snc_wdf_advisory_connector'
                            element: 'best_for'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '66c31b4abe54489995513553f06ab54d'
                        key: {
                            name: 'x_snc_wdf_advisory_use_case'
                            element: 'persona'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_one_extend_resource_attribute_mapping'
                        id: '673adc7c744c4cda8dfd2d2434768d0b'
                        key: {
                            resource_mapping: {
                                id: '97a230f6d014469fbc8e4149780f8072'
                                key: {
                                    parent_capability: '586e7276b2134fc9be7061b6a911defd'
                                    resource_capability: '5817eb2b9f36121029ead63a6a0a1c7c'
                                    resource_name: 'WebSearch'
                                }
                            }
                            resource_attribute_name: '2c17ef2b9f36121029ead63a6a0a1cda'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '674ec855ff3a4124a43b0bbb04a6aad2'
                        key: {
                            name: 'x_snc_wdf_advisory_checklist'
                            element: 'checklist_type'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '678074a55cb64c648e5e77ce17be2a58'
                        key: {
                            name: 'x_snc_wdf_advisory_checklist'
                            element: 'tag'
                            value: 'needs_review'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_ux_lib_asset'
                        id: '67899d71ab8749ce9d887553e18b90d1'
                        key: {
                            name: 'x_snc_wdf_advisory/index.es'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: '68241106d922458f88a52616fa96ce20'
                        key: {
                            name: 'x_snc_wdf_advisory_connector'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '6866892ee75747ce8228e475cc519c15'
                        key: {
                            name: 'x_snc_wdf_advisory_connector'
                            element: 'keywords'
                        }
                    },
                    {
                        table: 'sys_ui_page'
                        id: '6870d2a62b76452ca0d56f28c4c5b4f5'
                        key: {
                            endpoint: 'x_snc_wdf_advisory_home.do'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '6885ffeea82047e7b8e15c383c339cf9'
                        deleted: true
                        key: {
                            name: 'x_snc_wdf_advisory_use_case'
                            element: 'industry'
                            value: 'technology'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_user_role_contains'
                        id: '6a46e96db7a24a269f923f6f96ac3ed8'
                        key: {
                            role: {
                                id: '4c0e7620e097410e8bc836e2ae9ff617'
                                key: {
                                    name: 'x_snc_wdf_advisory.admin'
                                }
                            }
                            contains: {
                                id: '600d58c05beb4fc58527adae4c26db9e'
                                key: {
                                    name: 'x_snc_wdf_advisory.builder_dev'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '6c4803762c5c4885a8a000461aeb1783'
                        key: {
                            name: 'x_snc_wdf_advisory_arch_pat'
                            element: 'industry_examples'
                            language: 'en'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '6daa920710d747d8a56f11988ff273d5'
                        key: {
                            name: 'x_snc_wdf_advisory_persona'
                        }
                    },
                    {
                        table: 'sys_one_extend_resource_attribute_mapping'
                        id: '6df08df5e8dc491e8ffb011c881e388d'
                        key: {
                            resource_mapping: {
                                id: '97a230f6d014469fbc8e4149780f8072'
                                key: {
                                    parent_capability: '586e7276b2134fc9be7061b6a911defd'
                                    resource_capability: '5817eb2b9f36121029ead63a6a0a1c7c'
                                    resource_name: 'WebSearch'
                                }
                            }
                            resource_attribute_name: 'e017ef2b9f36121029ead63a6a0a1cf3'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '6f2788d31f26427e88d4d4e75cfff708'
                        key: {
                            name: 'x_snc_wdf_advisory_use_case'
                            element: 'links'
                        }
                    },
                    {
                        table: 'sys_gen_ai_skill'
                        id: '6fe81ccd2ff64f50809dea3fafa4e3ae'
                        key: {
                            skill_document: '586e7276b2134fc9be7061b6a911defd'
                            skill_table: 'sys_one_extend_capability'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '7035719f0b0e43e9900ab4d53a84b59e'
                        key: {
                            name: 'x_snc_wdf_advisory_use_case'
                            element: 'line_of_business'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '714641c65da14bb89400eda1e98e5eee'
                        key: {
                            name: 'x_snc_wdf_advisory_demo_step'
                            element: 'panel_type'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '715ec65c9e8c430cb09ff5342b1f9a30'
                        key: {
                            name: 'x_snc_wdf_advisory_connector'
                            element: 'mid_server_requirement'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: '72ceedb4ded442f48cce1c68dcdb5f39'
                        deleted: true
                        key: {
                            name: 'x_snc_wdf_advisory_use_case'
                            element: 'tier'
                        }
                    },
                    {
                        table: 'sys_gen_ai_feature_mapping'
                        id: '72f3b31f5fb848dfbfb391a51cc00ddc'
                        key: {
                            feature_name: 'WDF Web Search'
                            document: '586e7276b2134fc9be7061b6a911defd'
                        }
                    },
                    {
                        table: 'sn_glider_source_artifact_m2m'
                        id: '73c9cd2405814ce8bee6d1c5bccf833f'
                        key: {
                            application_file: '04ed384302854ebeb402abf026edc411'
                            source_artifact: '49f15c1d38954923a55c6cf548c77af3'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '7732b4c92bd94ff1b5a6579cdab245a2'
                        deleted: true
                        key: {
                            name: 'x_snc_wdf_advisory_use_case'
                            element: 'deploy_time_estimate'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '7770152f1ca94aa5b7a3256a126bb5e7'
                        key: {
                            name: 'x_snc_wdf_advisory_use_case'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '777d68563bdb44caa65a71f407b21aee'
                        key: {
                            name: 'x_snc_wdf_advisory_scn_demo'
                            element: 'query_text'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '779af88c942c4e849c5c1c5f150404ee'
                        key: {
                            name: 'x_snc_wdf_advisory_checklist'
                            element: 'status'
                            value: 'done'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '7834def303de43c3b8172d614e15475f'
                        deleted: true
                        key: {
                            name: 'x_snc_wdf_advisory_use_case'
                            element: 'linked_demo'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '78d73b1e61e34a1fbc2d84d839934e30'
                        key: {
                            name: 'x_snc_wdf_advisory_persona'
                            element: 'show_protocol_detail'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '79fe7adf715546ee8783694279ea8f97'
                        key: {
                            name: 'x_snc_wdf_advisory_use_case'
                            element: 'solution'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '7a514855937b41379735929b4a8e631d'
                        key: {
                            name: 'x_snc_wdf_advisory_vis_rule'
                            element: 'screen'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '7b0fc4b0d31d40cda2460175758dbbb4'
                        deleted: true
                        key: {
                            name: 'x_snc_wdf_advisory_use_case'
                            element: 'build_notes'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: '7b490b2ad0b54a1d84b6728d5d05d4cb'
                        key: {
                            name: 'x_snc_wdf_advisory_persona'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '7bad9f5519ed461598aa5e4595f8563a'
                        key: {
                            name: 'x_snc_wdf_advisory_arch_pat'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '7bed09efdd624f0e88ffc260716c2c29'
                        key: {
                            name: 'x_snc_wdf_advisory_arch_pat'
                            element: 'tagline'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sn_glider_source_artifact_m2m'
                        id: '7c13c9dc93c24b3db524076a3967eac3'
                        deleted: true
                        key: {
                            application_file: '84a8acc61bd04b0b9d24058ba1ce7548'
                            source_artifact: '338558159419428d94d42cb863910bd3'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: '7e7f8451e99f436aa65f081af341b197'
                        key: {
                            name: 'x_snc_wdf_advisory_demo_step'
                            element: 'panel_type'
                        }
                    },
                    {
                        table: 'sys_one_extend_resource_edge'
                        id: '7f955ac9d23a49f18f3ca76e52da03cd'
                        key: {
                            internal_name: 'WebSearch__WDF Web Search'
                        }
                    },
                    {
                        table: 'sys_user_role'
                        id: '7fc6c5a7e62d4c489d2403de31cc07f7'
                        key: {
                            name: 'x_snc_wdf_advisory.business_user'
                        }
                    },
                    {
                        table: 'sys_ux_lib_asset'
                        id: '81d4fb23973a49daadcd6d57bb855908'
                        deleted: true
                        key: {
                            name: 'x_snc_wdf_advisory/main.js.map'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '837bce06d8f945feb17e1e32c427b4cc'
                        key: {
                            sys_security_acl: 'f95677c6ffb648059b550d0ec3ab733e'
                            sys_user_role: {
                                id: '4c0e7620e097410e8bc836e2ae9ff617'
                                key: {
                                    name: 'x_snc_wdf_advisory.admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_ux_lib_asset'
                        id: '84a8acc61bd04b0b9d24058ba1ce7548'
                        deleted: true
                        key: {
                            name: 'x_snc_wdf_advisory/vendor-react-dom--4cdffd9b.js.map'
                        }
                    },
                    {
                        table: 'sn_glider_source_artifact_m2m'
                        id: '84f7fbd94a29441a987d8756fde3e268'
                        deleted: true
                        key: {
                            application_file: 'adc3ff0025df4dbba86570707b02027e'
                            source_artifact: '338558159419428d94d42cb863910bd3'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '85a2242d35db45c2a8b9457f9c302b82'
                        deleted: true
                        key: {
                            name: 'x_snc_wdf_advisory_use_case'
                            element: 'tier'
                            value: 'transform'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '86e65839a7284dff8d5365fdbf0795e3'
                        deleted: true
                        key: {
                            name: 'x_snc_wdf_advisory_use_case'
                            element: 'keywords'
                        }
                    },
                    {
                        table: 'sn_glider_source_artifact_m2m'
                        id: '8733fb735d2e43f5b6a8ed7dc1e05e58'
                        key: {
                            application_file: 'c855fcae94324d438d4a97ad3b1df488'
                            source_artifact: '49f15c1d38954923a55c6cf548c77af3'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '8868c6c37a0a429ba0aab80f51d4774d'
                        key: {
                            name: 'x_snc_wdf_advisory_vis_rule'
                            element: 'persona'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '88f690f171644a279f7c4b6cbc621c0b'
                        key: {
                            name: 'x_snc_wdf_advisory_vis_rule'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '89851cf44fcb4000b4c6cce05d004723'
                        key: {
                            name: 'x_snc_wdf_advisory_connector'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_gen_ai_strategy_mapping'
                        id: '89b25f76ce7a4a618b4fe3d78373cb98'
                        key: {
                            strategy: 'CAPABILITY_EXECUTION'
                            feature: {
                                id: '72f3b31f5fb848dfbfb391a51cc00ddc'
                                key: {
                                    feature_name: 'WDF Web Search'
                                    document: '586e7276b2134fc9be7061b6a911defd'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '8a7c54d517c64521b7f58aded70314e8'
                        deleted: true
                        key: {
                            name: 'x_snc_wdf_advisory_use_case'
                            element: 'industry'
                            value: 'education'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '8b153056a9374a548d3b211c1d75782d'
                        key: {
                            name: 'x_snc_wdf_advisory_checklist'
                            element: 'sub_description'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ux_lib_asset'
                        id: '8c47a341031c43c89a824348e9e60bb6'
                        key: {
                            name: 'x_snc_wdf_advisory/purify.js.map'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '8d1440d672fa496dbe2511b9454b59bf'
                        key: {
                            name: 'x_snc_wdf_advisory_scn_demo'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: '8ddcdbba477f4777ae97d765eff078aa'
                        deleted: true
                        key: {
                            name: 'x_snc_wdf_advisory_use_case'
                            element: 'industry'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '8e44060911524abfa84e77347c73613d'
                        key: {
                            name: 'x_snc_wdf_advisory_use_case'
                            element: 'outcome'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: '8f6ca6b23d1148baa554eba637c59f85'
                        key: {
                            name: 'x_snc_wdf_advisory_checklist'
                            element: 'status'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '900910412f3a4f50809dea3fafa4e34a'
                        deleted: true
                        key: {
                            document_key: '500910412f3a4f50809dea3fafa4e339'
                            variable: '14a8e8397f9e9610076726d6ac866591'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '90c72b5ecb5441908e779f9dc5815964'
                        key: {
                            name: 'x_snc_wdf_advisory_arch_pat'
                            element: 'data_flow_steps'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '92bb22d1d48847b98255fb049680967d'
                        key: {
                            name: 'x_snc_wdf_advisory_persona'
                            element: 'show_compliance'
                            language: 'en'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '92d766dbe0d140b58b89c0f3f9f9e60c'
                        key: {
                            name: 'x_snc_wdf_advisory_demo_step'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '930e9c3402df4a709692229c7984cf93'
                        key: {
                            name: 'x_snc_wdf_advisory_persona'
                            element: 'icon'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '93960cc96ea54ce39a740e20071eb47a'
                        key: {
                            name: 'x_snc_wdf_advisory_arch_pat'
                            element: 'name'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '939ddab46b5b4b8cb17c511d46080633'
                        key: {
                            name: 'x_snc_wdf_advisory_checklist'
                            element: 'checklist_type'
                            value: 'infrastructure'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '940910412f3a4f50809dea3fafa4e33d'
                        deleted: true
                        key: {
                            document_key: '500910412f3a4f50809dea3fafa4e339'
                            variable: '4fee37d893b64210aa5730f164891896'
                        }
                    },
                    {
                        table: 'sys_ux_lib_asset'
                        id: '941dd75d100248a8aa34400ce8e28146'
                        key: {
                            name: 'x_snc_wdf_advisory/wdf-advisor/main'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '9442ba765e514902b110f16309b75e9a'
                        deleted: true
                        key: {
                            name: 'x_snc_wdf_advisory_use_case'
                            element: 'industry'
                            value: 'retail'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_ux_lib_asset'
                        id: '94b14339e528432e901cc2d9ac0d4738'
                        key: {
                            name: 'x_snc_wdf_advisory/vendor-html2canvas--7e596869'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '94ce054bea924445bb7a497407707326'
                        key: {
                            name: 'x_snc_wdf_advisory_demo_step'
                            element: 'is_final_step'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '953ff0e4ebac49569195cb58ec2380f5'
                        key: {
                            name: 'x_snc_wdf_advisory_arch_pat'
                            element: 'industry_examples'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '95f54c6cfd8a48d980a713f0ad86d266'
                        key: {
                            name: 'x_snc_wdf_advisory_use_case'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '96820278191f4f45952909cde75312a0'
                        key: {
                            name: 'x_snc_wdf_advisory_persona'
                            element: 'sort_order'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '96e786a2e2a64252bba5bf9e207caf18'
                        key: {
                            name: 'x_snc_wdf_advisory_demo_step'
                            element: 'step_number'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_one_extend_resource_mapping'
                        id: '97a230f6d014469fbc8e4149780f8072'
                        key: {
                            parent_capability: '586e7276b2134fc9be7061b6a911defd'
                            resource_capability: '5817eb2b9f36121029ead63a6a0a1c7c'
                            resource_name: 'WebSearch'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '97bbb3adbaf046149110b4da3c7d2a2e'
                        key: {
                            name: 'x_snc_wdf_advisory_vis_rule'
                            element: 'screen'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '99e8fab9ed234e618cf82708bf752be3'
                        key: {
                            name: 'x_snc_wdf_advisory_use_case'
                            element: 'products'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '9addec7cef09413f84bb755e7de424d3'
                        key: {
                            name: 'x_snc_wdf_advisory_use_case'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '9bb4902b09cf4725b08b265f4f14e55f'
                        key: {
                            name: 'x_snc_wdf_advisory_demo_step'
                            element: 'tag_label'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '9d3c8060622e42dd9c78773fa132fe89'
                        key: {
                            name: 'x_snc_wdf_advisory_demo_step'
                            element: 'title'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '9e10d1b7006d43eea79ad5211d7416fd'
                        deleted: true
                        key: {
                            name: 'x_snc_wdf_advisory_use_case'
                            element: 'industry'
                            value: 'telecom'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '9f419ca27b734a8f9af1e98246cfec04'
                        key: {
                            name: 'x_snc_wdf_advisory_arch_pat'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '9f66b2a451414274a81c7b4df7226e5f'
                        key: {
                            name: 'x_snc_wdf_advisory_checklist'
                            element: 'status'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'a016fb7154a34bbc83ee41d8eeb0c31b'
                        key: {
                            name: 'x_snc_wdf_advisory_arch_pat'
                            element: 'tagline'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'a026e62fe9d44360a721aec052f6ab17'
                        deleted: true
                        key: {
                            name: 'x_snc_wdf_advisory_use_case'
                            element: 'industry'
                            value: 'healthcare'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'a0b0ad3a55ed44c8835987d6337fc967'
                        key: {
                            name: 'x_snc_wdf_advisory_persona'
                            element: 'show_admin_checklists'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'a1a30262bdb9472b92a41d0de901405f'
                        key: {
                            name: 'x_snc_wdf_advisory_demo_step'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'a2489bb2310748de8a88c173326ad8cd'
                        key: {
                            name: 'x_snc_wdf_advisory_connector'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'a32843b021164761b5ab039b2c1da930'
                        key: {
                            name: 'x_snc_wdf_advisory_demo_step'
                            element: 'scenario'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: 'a3e6a15ce85242b5becc720510c37290'
                        key: {
                            name: 'x_snc_wdf_advisory_use_case'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'a4a4b6ad0dd84ece98c8505865d02de6'
                        key: {
                            name: 'x_snc_wdf_advisory_vis_rule'
                            element: 'visible'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'a4ec0148e87345f89f414e09563f5bf3'
                        key: {
                            name: 'x_snc_wdf_advisory_demo_step'
                            element: 'description'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'a589310b84da4d8293305b7bc197786c'
                        key: {
                            name: 'x_snc_wdf_advisory_connector'
                            element: 'q2_roadmap'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'a63b0c184edb4ada88fa641d44cd806a'
                        deleted: true
                        key: {
                            name: 'x_snc_wdf_advisory_use_case'
                            element: 'deploy_time_estimate'
                        }
                    },
                    {
                        table: 'sys_one_extend_resource_attribute_mapping'
                        id: 'a92ddb1d20184be09f9f6294bfab7c31'
                        key: {
                            resource_mapping: {
                                id: '97a230f6d014469fbc8e4149780f8072'
                                key: {
                                    parent_capability: '586e7276b2134fc9be7061b6a911defd'
                                    resource_capability: '5817eb2b9f36121029ead63a6a0a1c7c'
                                    resource_name: 'WebSearch'
                                }
                            }
                            resource_attribute_name: 'c11ece269fc3121029ead63a6a0a1cd2'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'aa4a266229314a5b84f5ea8f6d7a4ed2'
                        key: {
                            name: 'x_snc_wdf_advisory_connector'
                            element: 'name'
                            language: 'en'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: 'ac6970abf7ec4602a35b57726f3d2ee5'
                        key: {
                            name: 'x_snc_wdf_advisory_connector'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'ad7c58cfa0f04b428d902cb465f9690c'
                        key: {
                            name: 'x_snc_wdf_advisory_connector'
                            element: 'status'
                            value: 'poc'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_ux_lib_asset'
                        id: 'adc3ff0025df4dbba86570707b02027e'
                        deleted: true
                        key: {
                            name: 'x_snc_wdf_advisory/main'
                        }
                    },
                    {
                        table: 'sn_nowassist_skill_config_status'
                        id: 'ae1b115d1b724dad98e800c0119c32fc'
                        key: {
                            skill_config: {
                                id: '40a8a89f571246dd966d3473e0a2dba7'
                                key: {
                                    skill_id: '586e7276b2134fc9be7061b6a911defd'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'afe6fee7a8374e2b8eae3fe26b667bd2'
                        key: {
                            name: 'x_snc_wdf_advisory_connector'
                            element: 'short_name'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'b2ef80ee6dc741e5bebb25796a8ca1e7'
                        key: {
                            name: 'x_snc_wdf_advisory_persona'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'b395b9ec5411483484cdf7399e9ede43'
                        key: {
                            name: 'x_snc_wdf_advisory_persona'
                            element: 'label'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'b4d83ef4d3c4459899541916aa206479'
                        key: {
                            name: 'x_snc_wdf_advisory_checklist'
                            element: 'tag'
                            value: 'verified'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'b5bc53cea17c47ffaf7df31e2b56062d'
                        deleted: true
                        key: {
                            name: 'x_snc_wdf_advisory_use_case'
                            element: 'keywords'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'b8c7af06865b4a668f944e7ce80d2209'
                        key: {
                            name: 'x_snc_wdf_advisory_persona'
                            element: 'label'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'b955be6288604ab884f5cdb248fb955b'
                        key: {
                            name: 'x_snc_wdf_advisory_connector'
                            element: 'q2_roadmap'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'bcb61fb4a83042809d7e0c94c798b8de'
                        key: {
                            name: 'x_snc_wdf_advisory_persona'
                            element: 'description'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'bce9cf8cbf8e4d578251ee66494b73b8'
                        key: {
                            name: 'x_snc_wdf_advisory_use_case'
                            element: 'business_problem'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'bd1fef50eba8470cb9c9794a4de6bd54'
                        key: {
                            name: 'x_snc_wdf_advisory_persona'
                            element: 'sort_order'
                        }
                    },
                    {
                        table: 'sn_glider_source_artifact_m2m'
                        id: 'bd7ea2a82eff48f5b73926a931bdb445'
                        key: {
                            application_file: '6870d2a62b76452ca0d56f28c4c5b4f5'
                            source_artifact: '49f15c1d38954923a55c6cf548c77af3'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'bd7eaed466b3434e9b3ae8bf1b2b96d6'
                        key: {
                            name: 'x_snc_wdf_advisory_scn_demo'
                            element: 'title'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_page'
                        id: 'bf7e2f1216ef48b7b697bc454b6eb3cd'
                        deleted: true
                        key: {
                            endpoint: 'x_snc_wdf_advisory_incident_manager.do'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'c0e293102fb68f10809dea3fafa4e326'
                        key: {
                            sys_security_acl: 'ee263a2ae1eb436ab14cd7c4bf30db9c'
                            sys_user_role: {
                                id: '7fcaa702933002009c8579b4f47ffbde'
                                key: {
                                    name: 'snc_internal'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'c1a6a26dad5544f1b1264f7171a5eec6'
                        key: {
                            name: 'x_snc_wdf_advisory_connector'
                            element: 'short_name'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'c1e5592362a44022a89233b5d5121eb1'
                        key: {
                            name: 'x_snc_wdf_advisory_demo_step'
                            element: 'panel_data'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'c39dbc4460f846b8a5698dccc9d1ffab'
                        key: {
                            name: 'x_snc_wdf_advisory_persona'
                            element: 'show_compliance'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'c3e35123725b4338b10318ad1f7d3dac'
                        key: {
                            name: 'x_snc_wdf_advisory_checklist'
                            element: 'status'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'c3ee2316f4e74d05a71929953b5c527d'
                        key: {
                            name: 'x_snc_wdf_advisory_vis_rule'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'c4aa9d9dccde45668f64ae2b1c33c571'
                        deleted: true
                        key: {
                            name: 'x_snc_wdf_advisory_use_case'
                            element: 'industry'
                            value: 'manufacturing'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sn_glider_source_artifact_m2m'
                        id: 'c59efb9fa4844dc8b787854deecd6e4f'
                        key: {
                            application_file: '502e7fdb80a046d3a35494812f117c93'
                            source_artifact: '49f15c1d38954923a55c6cf548c77af3'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'c5cb33cafa464b9a9d8a5388fb3ca2b5'
                        key: {
                            name: 'x_snc_wdf_advisory_connector'
                            element: 'status'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'c75828f98f204d5899f245ee3a2bc8a1'
                        key: {
                            name: 'x_snc_wdf_advisory_connector'
                            element: 'latency'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ux_lib_asset'
                        id: 'c855fcae94324d438d4a97ad3b1df488'
                        key: {
                            name: 'x_snc_wdf_advisory/vendor-html2canvas--7e596869.js.map'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'c8b12c8d2ffa4f50809dea3fafa4e3a4'
                        deleted: true
                        key: {
                            document_key: '44b12c8d2ffa4f50809dea3fafa4e3a3'
                            variable: '9a24c09793dc1210aa5730f1648918c0'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: 'c9602905a53648c1afe0bd2831d21487'
                        key: {
                            name: 'x_snc_wdf_advisory_checklist'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'c961fd10961a4e7a82bfafa226d5d5dc'
                        key: {
                            name: 'x_snc_wdf_advisory_connector'
                            element: 'tagline'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: 'cc365ccff9fc49d08834ddd7cb84683f'
                        key: {
                            name: 'x_snc_wdf_advisory_arch_pat'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'cc6e4a64152448a89a02d9488a86c269'
                        key: {
                            name: 'x_snc_wdf_advisory_vis_rule'
                            element: 'description'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'cda003b7436648d2b6a89e49cfb635c0'
                        key: {
                            name: 'x_snc_wdf_advisory_persona'
                            element: 'show_pricing'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'ceb611f119364470af85123c425dcd32'
                        key: {
                            name: 'x_snc_wdf_advisory_connector'
                            element: 'supports_write_back'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'd0384fd572a244ce8990bb1b6645a35a'
                        deleted: true
                        key: {
                            name: 'x_snc_wdf_advisory_use_case'
                            element: 'description'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'd039c730d74d438bb6db431339201cb1'
                        key: {
                            name: 'x_snc_wdf_advisory_persona'
                            element: 'show_protocol_detail'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'd092b5ae6c0b431394b25c4099b3fa3a'
                        key: {
                            name: 'x_snc_wdf_advisory_connector'
                            element: 'name'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'd1d4eaafa3c246de99a4c889107dec07'
                        key: {
                            sys_security_acl: 'a3bc013447ec4eeb9ebc513cc205dab4'
                            sys_user_role: {
                                id: '4c0e7620e097410e8bc836e2ae9ff617'
                                key: {
                                    name: 'x_snc_wdf_advisory.admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'd2a2d0fd1a544ba4981038be09ecb826'
                        key: {
                            name: 'x_snc_wdf_advisory_persona'
                            element: 'description'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'd3436bc33a6d4eecb3ca3a566ca2dee2'
                        key: {
                            name: 'x_snc_wdf_advisory_connector'
                            element: 'auth_method'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'd40910412f3a4f50809dea3fafa4e34a'
                        key: {
                            document_key: '500910412f3a4f50809dea3fafa4e339'
                            variable: 'ab5ef79893b64210aa5730f16489185a'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'd512536fba954289ae18ec0f0d50cd49'
                        key: {
                            name: 'x_snc_wdf_advisory_connector'
                            element: 'protocol'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'd583faba47eb4a78a5ad8e3934e6be67'
                        key: {
                            name: 'x_snc_wdf_advisory_connector'
                            element: 'latency'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'd6c67857aa0d4349b8e6e21b8809db8b'
                        key: {
                            name: 'x_snc_wdf_advisory_connector'
                            element: 'status'
                            value: 'planning'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'd80910412f3a4f50809dea3fafa4e33b'
                        deleted: true
                        key: {
                            document_key: '500910412f3a4f50809dea3fafa4e339'
                            variable: 'e3f313ddff6522103a2bffffffffff48'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'd9767dde64fc415c927dbdb65c33bde9'
                        deleted: true
                        key: {
                            name: 'x_snc_wdf_advisory_use_case'
                            element: 'linked_demo'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'db9e090a26204a3f93b6abc582702450'
                        key: {
                            name: 'x_snc_wdf_advisory_vis_rule'
                            element: 'description'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'dd7e06f9b28b4876aae7a7a5d3d05ded'
                        deleted: true
                        key: {
                            name: 'x_snc_wdf_advisory_use_case'
                            element: 'description'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'dffd907ebe3b4e3d9815caca21b703cb'
                        key: {
                            name: 'x_snc_wdf_advisory_scn_demo'
                            element: 'tags'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'e100988a6a1d4d6ebb1a22f4af58c75e'
                        deleted: true
                        key: {
                            name: 'x_snc_wdf_advisory_use_case'
                            element: 'tier'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'e1f04281e2fe4a90a3109dc267c91222'
                        key: {
                            name: 'x_snc_wdf_advisory_connector'
                            element: 'detail'
                        }
                    },
                    {
                        table: 'sys_generative_ai_prompt_config'
                        id: 'e28268052f3e4f50809dea3fafa4e393'
                        deleted: true
                        key: {
                            ai_config: 'ee8228052f3e4f50809dea3fafa4e372'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'e3ce88009e9e400e9611cbc5d4a8aa0f'
                        key: {
                            name: 'x_snc_wdf_advisory_use_case'
                            element: 'links'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'e54218fabe944c81b4f40bfd3eafe75a'
                        key: {
                            name: 'x_snc_wdf_advisory_use_case'
                            element: 'title'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'e5a3b0b4fec64fb9b2a772abe963f099'
                        key: {
                            name: 'x_snc_wdf_advisory_checklist'
                            element: 'label'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'e5bcbef2d2e248b8bd784a6e85fe8812'
                        key: {
                            name: 'x_snc_wdf_advisory_checklist'
                            element: 'section'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sn_glider_source_artifact_m2m'
                        id: 'e6709cadfdc34915bdee9236f7bc6ee8'
                        key: {
                            application_file: '611df4c21d36442fbfc28e824565b268'
                            source_artifact: '49f15c1d38954923a55c6cf548c77af3'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'e7317086ee844a85a514cdb983780543'
                        key: {
                            name: 'x_snc_wdf_advisory_persona'
                            element: 'key'
                        }
                    },
                    {
                        table: 'sn_glider_source_artifact_m2m'
                        id: 'e7c95aa794be42d9b46861eb70951387'
                        deleted: true
                        key: {
                            application_file: '81d4fb23973a49daadcd6d57bb855908'
                            source_artifact: '338558159419428d94d42cb863910bd3'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'ea32869a74c84107af93ace1ba6ae112'
                        key: {
                            name: 'x_snc_wdf_advisory_checklist'
                            element: 'tag'
                            value: 'blocker'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'ed2583420f4b4d6595e1a6f7eaa08abf'
                        deleted: true
                        key: {
                            name: 'x_snc_wdf_advisory_use_case'
                            element: 'tier'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'ed54fa2240ea476ab3bbd1011a3a3d62'
                        deleted: true
                        key: {
                            name: 'x_snc_wdf_advisory_use_case'
                            element: 'industry'
                            value: 'cross_industry'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'ef04269b553a4d5ea0cc07d22ceb6382'
                        key: {
                            name: 'x_snc_wdf_advisory_connector'
                            element: 'detail'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'f06e8d63ba2647e48b6705fc99330031'
                        key: {
                            name: 'x_snc_wdf_advisory_vis_rule'
                            element: 'content_area'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'f095b8a34dd04095a714b24ece263dc3'
                        key: {
                            name: 'x_snc_wdf_advisory_arch_pat'
                            element: 'connectors'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'f0f91b8381e043008c65702c86d82f9d'
                        key: {
                            name: 'x_snc_wdf_advisory_arch_pat'
                            element: 'connectors'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'f1a2ca5b1e63415f9fe40e12fc439747'
                        key: {
                            name: 'x_snc_wdf_advisory_demo_step'
                            element: 'panel_type'
                            value: 'rows'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'f266875718354a4cae6bfd9f987c82c7'
                        key: {
                            name: 'x_snc_wdf_advisory_use_case'
                            element: 'external_systems'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'f524d887fff346b1b97ceeb6bcf48ccc'
                        key: {
                            name: 'x_snc_wdf_advisory_use_case'
                            element: 'industry'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'f67d511c4f81480a9cd6dc52f4c940be'
                        key: {
                            name: 'x_snc_wdf_advisory_checklist'
                            element: 'checklist_type'
                            value: 'compliance'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'f6a23e0669a74765a1bd221a77fe762b'
                        key: {
                            name: 'x_snc_wdf_advisory_connector'
                            element: 'q4_roadmap'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'f6fc8d3ba86846e1adf87f41692f9092'
                        key: {
                            name: 'x_snc_wdf_advisory_demo_step'
                            element: 'panel_data'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'f7e32056774c4a259036d2724c80d710'
                        key: {
                            name: 'x_snc_wdf_advisory_checklist'
                            element: 'tag'
                            value: 'in_progress'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'f99d9ef245d8411688b8b89aa86b557e'
                        key: {
                            sys_security_acl: '5c95094fc6db46cf82c3de41c497789e'
                            sys_user_role: {
                                id: '4c0e7620e097410e8bc836e2ae9ff617'
                                key: {
                                    name: 'x_snc_wdf_advisory.admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'fa36916bd55d4ae38f4fefaa27df66e5'
                        key: {
                            name: 'x_snc_wdf_advisory_connector'
                            element: 'not_for'
                        }
                    },
                    {
                        table: 'sys_gen_ai_skill_applicability'
                        id: 'faf818012f3a4f50809dea3fafa4e346'
                        key: {
                            skill_id: '6fe81ccd2ff64f50809dea3fafa4e3ae'
                        }
                    },
                    {
                        table: 'sys_generative_ai_prompt_config'
                        id: 'fba12c8d2ffa4f50809dea3fafa4e36d'
                        key: {
                            ai_config: '73a12c8d2ffa4f50809dea3fafa4e368'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: 'fc1e26d3181a4fd8820ef84641adcdea'
                        key: {
                            name: 'x_snc_wdf_advisory_checklist'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'fd39f325cc3d40a3928502e55830b7d6'
                        key: {
                            name: 'x_snc_wdf_advisory_scn_demo'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'fd7a8a795d5b46e28d2fc08e59955a11'
                        key: {
                            name: 'x_snc_wdf_advisory_checklist'
                            element: 'checklist_type'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'fdf8a39464b04feaa6bd42f55bfcbec6'
                        key: {
                            name: 'x_snc_wdf_advisory_demo_step'
                            element: 'scenario'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'fe8fbb430b254830b1251ddf972f41ef'
                        key: {
                            name: 'x_snc_wdf_advisory_connector'
                            element: 'status'
                            value: 'blocked_regulated'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'fede359473cf47b3b0c7e48749f5cdd2'
                        key: {
                            name: 'x_snc_wdf_advisory_use_case'
                            element: 'solution'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'ff2b7181f23f4f0398c82bb3dacc3ea6'
                        key: {
                            name: 'x_snc_wdf_advisory_persona'
                            element: 'show_build_agent'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: 'ff9154ddad7e4faa9f2a200702c612cc'
                        key: {
                            name: 'x_snc_wdf_advisory_checklist'
                            element: 'tag'
                        }
                    },
                ]
            }
        }
    }
}
