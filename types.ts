export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, unknown>;
  type: string;
  created_at: string;
  modified_at: string;
}

export interface Instructor extends CosmicObject {
  type: 'instructors';
  metadata: {
    name?: string;
    specialty?: string;
    bio?: string;
    photo?: {
      url: string;
      imgix_url: string;
    };
  };
}

export interface Course extends CosmicObject {
  type: 'courses';
  metadata: {
    description?: string;
    thumbnail_image?: {
      url: string;
      imgix_url: string;
    };
    price?: number;
    difficulty?: unknown; // select-dropdown returns {key, value} object
    lesson_count?: number;
    duration?: string;
    instructor?: Instructor;
  };
}

export interface Testimonial extends CosmicObject {
  type: 'testimonials';
  metadata: {
    student_name?: string;
    avatar?: {
      url: string;
      imgix_url: string;
    };
    rating?: number;
    quote?: string;
    course?: Course;
  };
}