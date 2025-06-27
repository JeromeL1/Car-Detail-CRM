# Car Detail CRM

A comprehensive business management software for car detailing professionals. Built with Next.js, React, TypeScript, and Supabase.

## Features

- Appointment scheduling and management
- Customer relationship management
- Vehicle information tracking
- Service package management
- Inventory tracking
- Photo documentation
- Payment processing
- Employee management

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Supabase
- **Authentication**: Supabase Auth
- **Database**: PostgreSQL (via Supabase)
- **Hosting**: [To be decided]

## Prerequisites

- Node.js 18.x or later
- npm 9.x or later
- Git
- A Supabase account

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone [repository-url]
   cd car-detail-crm
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   - Create a copy of `.env.local.example` and name it `.env.local`
   ```bash
   cp .env.local.example .env.local
   ```
   - Create a new project in Supabase
   - Get your project URL and anon key from Supabase dashboard
   - Update `.env.local` with your Supabase credentials:
     ```
     NEXT_PUBLIC_SUPABASE_URL=your-project-url
     NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
     ```

4. **Database Setup**
   - Navigate to your Supabase project's SQL editor
   - Execute the database schema SQL commands (found in `database/schema.sql`)
   - Set up Row Level Security (RLS) policies as needed

5. **Run the development server**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:3000`

## Development Workflow

1. Create a new branch for your feature
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes and commit them
   ```bash
   git add .
   git commit -m "Description of your changes"
   ```

3. Push your changes and create a pull request
   ```bash
   git push origin feature/your-feature-name
   ```

## Project Structure

```
src/
├── app/              # Next.js app router pages
├── components/       # Reusable React components
├── lib/             # Library configurations
├── types/           # TypeScript type definitions
├── utils/           # Utility functions
└── styles/          # Additional styles
```

## Database Schema

The database includes the following main tables:
- profiles
- customers
- vehicles
- service_packages
- appointments
- service_photos
- inventory_items
- inventory_transactions
- payments

For detailed schema information, refer to `database/schema.sql`.

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

[License Type] - See LICENSE file for details

## Support

For support, please [contact information or process]