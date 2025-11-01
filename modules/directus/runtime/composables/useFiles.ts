import { useRuntimeConfig } from '#imports';
import type { File } from '~/types';

export default function useFiles() {
	const config = useRuntimeConfig();

	function fileUrl(fileId: string | File | null | undefined): string | undefined {
		if (!fileId) return undefined;

		// Get base URL from config, with fallback
		const baseUrl = config.public?.directus?.rest?.baseUrl || process.env.DIRECTUS_URL || 'http://localhost:8055';

		if (typeof fileId === 'string') {
			return `${baseUrl}/assets/${fileId}`;
		}

		// Handle case where fileId is an object<File>
		if (typeof fileId === 'object' && fileId && 'id' in fileId) {
			return `${baseUrl}/assets/${(fileId as File).id}`;
		}

		return undefined;
	}

	return {
		fileUrl,
	};
}
