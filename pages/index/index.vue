<template>
    <div class="project-list">
        <div class="row">
            <div class="col-6">
                <nuxt-link class="button" to="/create"><icon name="plus-circle"/><span>Create new project</span></nuxt-link>
            </div>
            <div class="col-6 text-right">
                <div class="project-list__search">
                    Suche: <input type="text" v-model="search">
                </div>
                
            </div>
        </div>
        <div class="row">
            <div 
                class="col-4"
                v-for="project in currentProjects"
                :key="`project-${ project.id }`"
            >
                <div class="project-list__item">
                    <div class="project-list__header">
                        <div class="project-list__project-name">{{ project.name }}</div>
                        <div class="project-list__project-repo">{{ project.repo }}</div>
                    </div>
                    
                    <div class="project-list__actions">
                        <div class="row">
                            <div class="col-12 text-right">
                                <nuxt-link class="button" :to="`/${ project.name }`"><icon name="edit"/></nuxt-link>
                                <button class="button" v-on:click="DeleteProject(project)"><icon name="trash"/></button>
                            </div>
                        </div>
                    </div>

                    <div 
                        class="project-list__repo"
                        v-for="(branch, branchId) in project.branches"
                        :key="`project-${ project.id }-branch-${ branchId }`"
                    >
                        <div class="row">
                            <div class="col-8">
                                <div class="project-list__branch-name">
                                    {{ branch.branch }}
                                </div>
                            </div>
                            <div class="col-4 text-right">
                                <button class="button" v-on:click="DeleteBranch(branch)"><icon name="trash"/></button>
                                <button class="button" v-if="branch.hasupdate"><icon name="cloud-upload"/><span>Deploy</span></button>
                            </div>
                        </div>
                        
                    </div>
                </div>    
            </div>
        </div>
        
    </div>
</template>

<script>
export default {
    async asyncData({ app }){
        let projects = null;

        try {
            projects = await app.$axios.$get('projects?_embed=branches');
        }catch(e){
            console.log(e);
        }
        
        return {
            projects,
            search: ''
        }
    },

    computed: {
        currentProjects: {
            get(){
                if(this.search == '') return this.projects;

                return this.projects.filter((project) => {
                    let projectName = project.name.toLowerCase();
                    let search = this.search.toLowerCase();

                    return projectName.indexOf(search) !== -1;
                });
            }
        }
    },

    methods: {
        async DeleteProject(project){
            await this.$axios.$delete(`projects/${ project.id }`);
            this.projects = await this.$axios.$get(`projects?_embed=branches`);
        },

        async DeleteBranch(branch){
            await this.$axios.$delete(`branches/${ branch.id }`);
            this.projects = await this.$axios.$get(`projects?_embed=branches`);
        }
    }
}
</script>
