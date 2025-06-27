-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Create custom types
create type user_role as enum ('admin', 'manager', 'detailer', 'customer');
create type appointment_status as enum ('scheduled', 'in_progress', 'completed', 'cancelled');
create type transaction_type as enum ('purchase', 'use', 'adjustment');
create type payment_status as enum ('pending', 'completed', 'failed', 'refunded');
create type payment_method as enum ('credit_card', 'cash', 'bank_transfer', 'other');

-- Create profiles table
create table profiles (
  id uuid references auth.users(id) primary key,
  role user_role not null default 'customer',
  first_name text,
  last_name text,
  phone_number text,
  email text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Create customers table
create table customers (
  id uuid references profiles(id) primary key,
  address text,
  city text,
  state text,
  postal_code text,
  notes text,
  preferred_contact_method text check (preferred_contact_method in ('email', 'phone', 'sms')),
  referral_source text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Create vehicles table
create table vehicles (
  id uuid primary key default uuid_generate_v4(),
  customer_id uuid references customers(id) not null,
  make text not null,
  model text not null,
  year integer not null,
  color text,
  vin text unique,
  license_plate text,
  special_instructions text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Create service_packages table
create table service_packages (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  description text,
  price decimal(10,2) not null,
  duration_minutes integer not null,
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Create appointments table
create table appointments (
  id uuid primary key default uuid_generate_v4(),
  customer_id uuid references customers(id) not null,
  vehicle_id uuid references vehicles(id) not null,
  service_package_id uuid references service_packages(id) not null,
  detailer_id uuid references profiles(id),
  status appointment_status default 'scheduled',
  start_time timestamptz not null,
  end_time timestamptz not null,
  total_price decimal(10,2) not null,
  notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Create service_photos table
create table service_photos (
  id uuid primary key default uuid_generate_v4(),
  appointment_id uuid references appointments(id) not null,
  photo_url text not null,
  photo_type text check (photo_type in ('before', 'after', 'during')),
  created_at timestamptz default now()
);

-- Create inventory_items table
create table inventory_items (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  description text,
  quantity integer not null default 0,
  minimum_quantity integer not null default 5,
  unit text not null,
  cost_per_unit decimal(10,2),
  supplier text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Create inventory_transactions table
create table inventory_transactions (
  id uuid primary key default uuid_generate_v4(),
  item_id uuid references inventory_items(id) not null,
  appointment_id uuid references appointments(id),
  transaction_type transaction_type not null,
  quantity integer not null,
  notes text,
  created_at timestamptz default now()
);

-- Create payments table
create table payments (
  id uuid primary key default uuid_generate_v4(),
  appointment_id uuid references appointments(id) not null,
  amount decimal(10,2) not null,
  payment_method payment_method not null,
  status payment_status default 'pending',
  transaction_id text,
  notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Create indexes for better query performance
create index idx_vehicles_customer_id on vehicles(customer_id);
create index idx_appointments_customer_id on appointments(customer_id);
create index idx_appointments_vehicle_id on appointments(vehicle_id);
create index idx_appointments_detailer_id on appointments(detailer_id);
create index idx_service_photos_appointment_id on service_photos(appointment_id);
create index idx_inventory_transactions_item_id on inventory_transactions(item_id);
create index idx_inventory_transactions_appointment_id on inventory_transactions(appointment_id);
create index idx_payments_appointment_id on payments(appointment_id);

-- Create updated_at triggers
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger update_profiles_updated_at
  before update on profiles
  for each row
  execute function update_updated_at_column();

create trigger update_customers_updated_at
  before update on customers
  for each row
  execute function update_updated_at_column();

create trigger update_vehicles_updated_at
  before update on vehicles
  for each row
  execute function update_updated_at_column();

create trigger update_service_packages_updated_at
  before update on service_packages
  for each row
  execute function update_updated_at_column();

create trigger update_appointments_updated_at
  before update on appointments
  for each row
  execute function update_updated_at_column();

create trigger update_inventory_items_updated_at
  before update on inventory_items
  for each row
  execute function update_updated_at_column();

create trigger update_payments_updated_at
  before update on payments
  for each row
  execute function update_updated_at_column(); 