<template>
    <div class="flex flex-col gap-4 bg-lightGreen rounded-lg p-4">
        <h3 class="text-lg font-semibold text-darkGreen">Comentarios</h3>
        <MainLoader v-if="loading" />
        <div v-else class="max-h-30 flex flex-col gap-2 overflow-y-auto md:max-h-20 lg:max-h-35">
            <div v-if="comments.length > 0" class="flex flex-col gap-4">
                <div v-for="comment in comments" :key="comment.id" class="flex flex-col gap-1 border-l-2 border-darkPink px-4">
                    <div class="flex flex-wrap justify-between items-center">
                        <p class="font-medium text-darkPink">{{ comment.profiles.display_name }}</p>
                        <p class="text-sm text-gray-600">{{ new Date(comment.created_at).toLocaleDateString() }}</p>
                    </div>
                    <p class="text-dark">{{ comment.content }}</p>
                </div>
            </div>
            <p v-else class="text-gray-500 italic">No hay comentarios aún</p>
        </div>
        <form action="#" @submit.prevent="sendComment()" class="flex flex-col gap-2 items-end">
            <MainLabel for="comment" class="sr-only">Escribe un comentario</MainLabel>
            <MainTextarea class="h-11 lg:h-full"
                id="comment"
                v-model="newComment.content"
                placeholder="Escribe un comentario..."
            />
            <PrimaryButton>Comentar</PrimaryButton>
        </form>
    </div>
</template>

<script>
import PrimaryButton from '../PrimaryButton.vue'
import { saveCommentsPost, getComments, suscribeToPostComments } from '../../services/document-habits';
import { subscribeToAuth } from '../../services/auth';
import MainLabel from '../form/MainLabel.vue';
import MainTextarea from '../form/MainTextarea.vue';
import MainLoader from '../MainLoader.vue';

export default {
    name: 'SectionComments',
    components: {
        PrimaryButton, MainLabel, MainTextarea, MainLoader
    },
    data() {
        return {
            comments: [],
            newComment: {
                content: '',
                display_name: '',
            },
            user: {
                id: null,
                email: null,
                display_name: null,
            },
            loading: true,
        }
    },
    props: {
        post_id: {
            type: [String, Number],
            required: true
        },
        username: {
            type: String,
            required: true
        },
        posted_at: {
            type: String,
            required: true
        },
        comment: {
            type: String,
            required: true
        }
    },
    methods: {
        async loadComments() {
            try {
                this.comments = await getComments(this.post_id);
                this.loading = false;
            } catch (error) {
                console.error("Error al cargar los comentarios:", error);
            }
        },
        async sendComment() {
            if (!this.newComment.content.trim()) return;
            
            try {
                await saveCommentsPost({
                    content: this.newComment.content,
                    user_id: this.user.id,
                    post_id: this.post_id
                });
                this.newComment.content = '';
            } catch (error) {
                console.error("Error al enviar el comentario:", error);
            }
        },
    },
    async mounted() {
        subscribeToAuth(newUser => this.user = newUser);
        suscribeToPostComments(async NewCommentReceived => {
            this.comments.push(NewCommentReceived);
        });
        try {
            await this.loadComments();
        } catch (error) {
            console.error("Error al cargar los comentarios:", error);
        }
    }
}
</script>