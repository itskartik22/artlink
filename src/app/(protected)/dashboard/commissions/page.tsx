"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import axios from "axios";
import { ArtFormType } from "@prisma/client";

interface CommissionSettings {
  isAcceptingCommissions: boolean;
  basePrice: number;
  pricePerHour: number | null;
  minimumPrice: number;
  maximumPrice: number | null;
  currency: string;
  turnaroundDays: number;
  description: string | null;
  termsAndConditions: string | null;
  artForms: Array<{
    type: ArtFormType;
    price: number | null;
    description: string | null;
    estimatedDays: number | null;
  }>;
  tags: Array<{
    name: string;
  }>;
}

const defaultSettings: CommissionSettings = {
  isAcceptingCommissions: true,
  basePrice: 0,
  pricePerHour: null,
  minimumPrice: 0,
  maximumPrice: null,
  currency: "INR",
  turnaroundDays: 7,
  description: null,
  termsAndConditions: null,
  artForms: [],
  tags: [],
};

const statusColors = {
  Pending: "bg-yellow-100 text-yellow-800",
  InProgress: "bg-blue-100 text-blue-800",
  Completed: "bg-green-100 text-green-800",
  Cancelled: "bg-red-100 text-red-800",
  Rejected: "bg-orange-100 text-orange-800",
};

interface Commission {
  id: string;
  title: string;
  description: string;
  category: string;
  budget: number;
  deadline: string;
  status: string;
  client: { name: string; email?: string; image?: string };
  // Add other fields as needed
}

export default function CommissionManagementPage() {
  const [commissions, setCommissions] = useState<Commission[]>([]);
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState<CommissionSettings>(defaultSettings);
  const [newTag, setNewTag] = useState("");
  const [selectedArtForm, setSelectedArtForm] = useState<ArtFormType | null>(null);
  const [artFormPrice, setArtFormPrice] = useState<string>("");
  const [artFormDays, setArtFormDays] = useState<string>("");

  // Fetch commissions and settings
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [commissionsRes, settingsRes] = await Promise.all([
          axios.get('/api/commissions/manage'),
          axios.get('/api/artist/commission-settings')
        ]);
        
        setCommissions(commissionsRes.data);
        setSettings(settingsRes.data || defaultSettings);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Update commission settings
  const handleSettingsUpdate = async () => {
    try {
      const response = await axios.post('/api/artist/commission-settings', settings);
      setSettings(response.data);
      toast.success("Settings updated successfully");
    } catch (error) {
      console.error("Error updating settings:", error);
      toast.error("Failed to update settings");
    }
  };

  // Add new tag
  const handleAddTag = () => {
    if (newTag && !settings.tags.some(tag => tag.name === newTag)) {
      setSettings({
        ...settings,
        tags: [...settings.tags, { name: newTag }]
      });
      setNewTag("");
    }
  };

  // Remove tag
  const handleRemoveTag = (tagName: string) => {
    setSettings({
      ...settings,
      tags: settings.tags.filter(tag => tag.name !== tagName)
    });
  };

  // Add art form
  const handleAddArtForm = () => {
    if (selectedArtForm && !settings.artForms.some(form => form.type === selectedArtForm)) {
      setSettings({
        ...settings,
        artForms: [...settings.artForms, {
          type: selectedArtForm,
          price: artFormPrice ? parseFloat(artFormPrice) : null,
          estimatedDays: artFormDays ? parseInt(artFormDays) : null,
          description: null,
        }]
      });
      setSelectedArtForm(null);
      setArtFormPrice("");
      setArtFormDays("");
    }
  };

  // Remove art form
  const handleRemoveArtForm = (artFormType: ArtFormType) => {
    setSettings({
      ...settings,
      artForms: settings.artForms.filter(form => form.type !== artFormType)
    });
  };

  // Update commission status
  const handleStatusUpdate = async (commissionId: string, newStatus: string) => {
    try {
      await axios.patch('/api/commissions/manage', {
        commissionId,
        status: newStatus
      });
      
      setCommissions(commissions.map(commission => 
        commission.id === commissionId 
          ? { ...commission, status: newStatus }
          : commission
      ));
      
      toast.success("Commission status updated successfully");
    } catch (error) {
      console.error("Error updating commission status:", error);
      toast.error("Failed to update commission status");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Commission Management</h2>
        <p className="text-muted-foreground">
          Manage your commission requests and settings
        </p>
      </div>

      {/* Commission Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Commission Settings</CardTitle>
          <CardDescription>
            Configure your commission preferences and pricing
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Availability Toggle */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Accepting Commissions</Label>
              <p className="text-sm text-muted-foreground">
                Toggle whether you&apos;re currently accepting new commission requests
              </p>
            </div>
            <Switch
              checked={settings.isAcceptingCommissions}
              onCheckedChange={(checked) => setSettings({ ...settings, isAcceptingCommissions: checked })}
            />
          </div>

          {/* Pricing */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="basePrice">Base Price</Label>
              <Input
                id="basePrice"
                type="number"
                value={settings.basePrice}
                onChange={(e) => setSettings({ ...settings, basePrice: parseFloat(e.target.value) })}
                placeholder="Enter base price"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pricePerHour">Price Per Hour (Optional)</Label>
              <Input
                id="pricePerHour"
                type="number"
                value={settings.pricePerHour || ""}
                onChange={(e) => setSettings({ ...settings, pricePerHour: e.target.value ? parseFloat(e.target.value) : null })}
                placeholder="Enter hourly rate"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="minimumPrice">Minimum Price</Label>
              <Input
                id="minimumPrice"
                type="number"
                value={settings.minimumPrice}
                onChange={(e) => setSettings({ ...settings, minimumPrice: parseFloat(e.target.value) })}
                placeholder="Enter minimum price"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="maximumPrice">Maximum Price (Optional)</Label>
              <Input
                id="maximumPrice"
                type="number"
                value={settings.maximumPrice || ""}
                onChange={(e) => setSettings({ ...settings, maximumPrice: e.target.value ? parseFloat(e.target.value) : null })}
                placeholder="Enter maximum price"
              />
            </div>
          </div>

          {/* Art Forms */}
          <div className="space-y-4">
            <Label>Art Forms</Label>
            <div className="flex gap-4">
              <Select
                value={selectedArtForm || ""}
                onValueChange={(value) => setSelectedArtForm(value as ArtFormType)}
              >
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Select art form" />
                </SelectTrigger>
                <SelectContent>
                  {Object?.values(ArtFormType).map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                type="number"
                value={artFormPrice}
                onChange={(e) => setArtFormPrice(e.target.value)}
                placeholder="Additional price"
                className="w-[150px]"
              />
              <Input
                type="number"
                value={artFormDays}
                onChange={(e) => setArtFormDays(e.target.value)}
                placeholder="Est. days"
                className="w-[150px]"
              />
              <Button onClick={handleAddArtForm}>Add</Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {settings.artForms.map((form) => (
                <Badge
                  key={form.type}
                  variant="secondary"
                  className="flex items-center gap-2"
                >
                  {form.type}
                  {form.price && ` - ₹${form.price}`}
                  {form.estimatedDays && ` - ${form.estimatedDays} days`}
                  <button
                    onClick={() => handleRemoveArtForm(form.type)}
                    className="ml-2 hover:text-destructive"
                  >
                    ×
                  </button>
                </Badge>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className="space-y-4">
            <Label>Specialization Tags</Label>
            <div className="flex gap-4">
              <Input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Enter a tag"
              />
              <Button onClick={handleAddTag}>Add Tag</Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {settings.tags.map((tag) => (
                <Badge
                  key={tag.name}
                  variant="secondary"
                  className="flex items-center gap-2"
                >
                  {tag.name}
                  <button
                    onClick={() => handleRemoveTag(tag.name)}
                    className="ml-2 hover:text-destructive"
                  >
                    ×
                  </button>
                </Badge>
              ))}
            </div>
          </div>

          {/* Description and Terms */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="description">Commission Description</Label>
              <Textarea
                id="description"
                value={settings.description || ""}
                onChange={(e) => setSettings({ ...settings, description: e.target.value })}
                placeholder="Describe your commission process and what clients can expect"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="terms">Terms and Conditions</Label>
              <Textarea
                id="terms"
                value={settings.termsAndConditions || ""}
                onChange={(e) => setSettings({ ...settings, termsAndConditions: e.target.value })}
                placeholder="Enter your commission terms and conditions"
              />
            </div>
          </div>

          <Button onClick={handleSettingsUpdate} className="w-full">
            Save Settings
          </Button>
        </CardContent>
      </Card>

      {/* Active Commissions */}
      <Card>
        <CardHeader>
          <CardTitle>Active Commissions</CardTitle>
          <CardDescription>
            Manage your ongoing commission requests
          </CardDescription>
        </CardHeader>
        <CardContent>
          {commissions.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No commission requests found
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Commission ID</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Budget</TableHead>
                  <TableHead>Deadline</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {commissions.map((commission) => (
                  <TableRow key={commission.id}>
                    <TableCell>{commission.id}</TableCell>
                    <TableCell>{commission.client.name}</TableCell>
                    <TableCell>{commission.title}</TableCell>
                    <TableCell>₹{commission.budget}</TableCell>
                    <TableCell>
                      {new Date(commission.deadline).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={statusColors[commission.status as keyof typeof statusColors] || ""}
                      >
                        {commission.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Select
                        defaultValue={commission.status}
                        onValueChange={(value) => handleStatusUpdate(commission.id, value)}
                      >
                        <SelectTrigger className="w-[140px]">
                          <SelectValue placeholder="Update status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Pending">Pending</SelectItem>
                          <SelectItem value="InProgress">In Progress</SelectItem>
                          <SelectItem value="Completed">Completed</SelectItem>
                          <SelectItem value="Cancelled">Cancelled</SelectItem>
                          <SelectItem value="Rejected">Rejected</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 