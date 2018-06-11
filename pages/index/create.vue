<template>
    <div class="project-create">
        <div class="project-create__header">
            Create project <b>{{ project.name }}</b>
        </div>
        <div class="project-create__content">
            <form v-on:submit.prevent="OnSubmit">
                <div class="row">
                    <div class="col-3">Name</div>
                    <div class="col-9"><input type="text" v-model="project.name"></div>
                </div>

                <div class="row">
                    <div class="col-3">Repository-URL</div>
                    <div class="col-9"><input type="text" v-model="project.repo"></div>
                </div>

                <div class="row">
                    <div class="col-3">Active</div>
                    <div class="col-9"><input type="checkbox" v-model="project.status"></div>
                </div>


                <div class="project-create__header">
                    <div class="row">
                        <div class="col-6"><b>Project branches</b></div>
                        <div class="col-6 text-right"><button class="button" type="button" v-on:click="OnCreateBranch"><icon name="plus-circle"/><span>Create a new branch</span></button></div>
                    </div>
                </div>

                <div class="project-create__branches">
                    <div 
                        class="row" 
                        v-for="(branch, branchId) in branches"
                        :key="`branch-${ branchId }`"
                    >
                        <div class="col-12">
                            <div class="project-create__branch">
                                <div class="row">
                                    <div class="col-3">Branch name</div>
                                    <div class="col-9"><input type="text" v-model="branch.branch"></div>
                                </div>
                                <div class="row">
                                    <div class="col-3">Server deploy path</div>
                                    <div class="col-9"><input type="text" v-model="branch.serverpath"></div>
                                </div>
                                <div class="row">
                                    <div class="col-3">Autodeploy</div>
                                    <div class="col-9"><input type="checkbox" v-model="branch.autodeploy"></div>
                                </div>
                                <div class="row">
                                    <div class="col-12">
                                        <button class="button" type="button" v-on:click="OnDeleteBranch(branchId)"><icon name="trash"/><span>Delete branch</span></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                

                <div class="row">
                    <div class="col-12 text-right">
                        <button class="button" type="submit"><icon name="save"/><span>Create project</span></button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    async asyncData(){

        return {
            project: {
                name: "New project",
                repo: "",
                status: true
            },
            branches: []
        }
    },

    methods: {
        OnCreateBranch(e){
            this.branches.push({
                "branch": "",
                "hasupdate": false,
                "autodeploy": false,
                "serverpath": ""
            });
        },

        OnDeleteBranch(index){
            this.branches.splice(index, 1);
        },

        async OnSubmit(e){
            let project = await this.$axios.$post('projects', this.project);

            console.log(project);

            for(let i = 0; i < this.branches.length; i++){
                let branch = this.branches[i];
                branch.projectId = project.id;

                await this.$axios.$post('branches', branch);
            }


            this.$router.push('/');
        }
    }
}
</script>

