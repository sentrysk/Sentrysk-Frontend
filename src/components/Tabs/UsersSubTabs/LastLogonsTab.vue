<template>
    <div class="tab-pane fade" id="systemUsersLastLogons" role="tabpanel" aria-labelledby="SystemUsersLastLogons">
        <!-- Last Update -->
        <div class="row">
            <b><span :title=localUpdateTime>Last Update : {{ timeDiff }}</span></b>
        </div>
        <table class="table table-striped table-bordered table-sm" id="sysUsersLastLogonsTable">
            <thead>
                <tr>
                <th>Username</th>
                <th>Last Logon</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="data in systemUsersLastLogons.last_logons" :key="data">
                    <td>
                        {{ data.username }}
                    </td>
                    <td>
                        {{ data.last_logon }}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import $ from "jquery";
    import { getSystemUsersLastLogons } from '../../../utils/requestUtils';
    import { formatToLocalTime, calculateDatetimeDifference } from '../../../utils/timeUtils';
    import moment from 'moment';

    export default {
        name: 'LastLogonsTab',
        data(){
            return{
                systemUsersLastLogons: {},
                localUpdateTime: "",
                timeDiff: ""
            }
        },
        mounted() {
            this.fillSystemUsersLastLogons();
        },
        methods:{
            async fillSystemUsersLastLogons(){
                try {
                    // Get the Agent ID from the URL
                    const agentId = this.$route.params.id;
                    
                    // Retrive System Users
                    this.systemUsersLastLogons = await getSystemUsersLastLogons(agentId);

                    // Set Last Update
                    this.localUpdateTime = formatToLocalTime(this.systemUsersLastLogons.updated);

                    // Set Time Diff
                    this.timeDiff = calculateDatetimeDifference(this.systemUsersLastLogons.updated);

                    // Set Last Login Time to Local Time
                    for(let userLogin of this.systemUsersLastLogons.last_logons){
                        userLogin.last_logon = formatToLocalTime(userLogin.last_logon)
                    }

                    // Make Users Last Logons Table as DataTable
                    $(document).ready(() => {


                        $('#sysUsersLastLogonsTable').DataTable({
                            searching: true,
                            lengthChange: true,
                            pageLength: 25,
                            order: [ 1, 'desc' ],
                            lengthMenu: [
                                [25, 50, 100, 250, -1],
                                [25, 50, 100, 250, 'All']
                            ],
                            columnDefs: [
                                {
                                    targets: 1, // Adjust the column index to date column
                                    type: 'date-gmt'
                                }
                            ]
                        }); 
                    });

                } catch (error) {
                    console.error('Error fetching system users last logons:', error);
                }
            }
        }
    }
</script>

<style>

</style>