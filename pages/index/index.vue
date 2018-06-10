<template>
    <div class="project-list">
        <div class="row">
            <div class="col-6">
                <nuxt-link to="/create"><icon name="plus-circle"/> Create new project</nuxt-link>
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
                                <nuxt-link to="create"><icon name="plus-circle"/></nuxt-link>
                                <button><icon name="trash"/></button>
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
                                <nuxt-link :to="`${ project.name }/${ branch.branch }`"><icon name="edit"/> {{ branch.branch }}</nuxt-link> 
                            </div>
                            <div class="col-4 text-right">
                                <button v-if="branch.hasupdate"><icon name="cloud-upload"/> Deploy</button>
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
    }
}
</script>
