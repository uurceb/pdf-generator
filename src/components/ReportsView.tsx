import React, { useState, useEffect } from 'react';
import { Download, BarChart3, TrendingUp, DollarSign, Users, Package } from 'lucide-react';
import { SalesReport } from '../types';
import { mockApi } from '../services/mockApi';
import { PDFGenerator } from './PDFTemplates';
import { LoadingSpinner } from './LoadingSpinner';

export const ReportsView: React.FC = () => {
  const [report, setReport] = useState<SalesReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    const loadReport = async () => {
      try {
        const data = await mockApi.getSalesReport();
        setReport(data);
      } catch (error) {
        console.error('Failed to load report:', error);
      } finally {
        setLoading(false);
      }
    };

    loadReport();
  }, []);

  const handleGenerateReport = async () => {
    if (!report) return;
    
    setGenerating(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate processing
      PDFGenerator.generateSalesReport(report);
    } catch (error) {
      console.error('Failed to generate report:', error);
    } finally {
      setGenerating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!report) {
    return (
      <div className="text-center py-12">
        <BarChart3 className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900">No report data available</h3>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Sales Report - {report.period}</h2>
            <p className="text-indigo-100 mt-1">Comprehensive overview of your business performance</p>
          </div>
          <button
            onClick={handleGenerateReport}
            disabled={generating}
            className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-lg transition-all duration-200 disabled:opacity-50"
          >
            {generating ? (
              <LoadingSpinner size="sm" className="border-white border-t-indigo-300" />
            ) : (
              <Download className="h-5 w-5" />
            )}
            <span>{generating ? 'Generating...' : 'Export Report'}</span>
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Revenue</p>
              <p className="text-3xl font-bold text-gray-900">${report.totalRevenue.toLocaleString()}</p>
              <p className="text-emerald-600 text-sm mt-1">↗ +12.5% from last period</p>
            </div>
            <div className="bg-emerald-50 p-3 rounded-lg">
              <DollarSign className="h-8 w-8 text-emerald-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Orders</p>
              <p className="text-3xl font-bold text-gray-900">{report.totalOrders.toLocaleString()}</p>
              <p className="text-blue-600 text-sm mt-1">↗ +8.3% from last period</p>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg">
              <Package className="h-8 w-8 text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Avg Order Value</p>
              <p className="text-3xl font-bold text-gray-900">${report.averageOrderValue.toFixed(2)}</p>
              <p className="text-purple-600 text-sm mt-1">↗ +4.2% from last period</p>
            </div>
            <div className="bg-purple-50 p-3 rounded-lg">
              <TrendingUp className="h-8 w-8 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <BarChart3 className="h-5 w-5 text-blue-600 mr-2" />
            Top Products
          </h3>
          <div className="space-y-4">
            {report.topProducts.map((product, index) => (
              <div key={product.name} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                    index === 0 ? 'bg-yellow-500' : 
                    index === 1 ? 'bg-gray-400' : 
                    index === 2 ? 'bg-orange-600' : 'bg-blue-500'
                  }`}>
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 truncate max-w-[200px]">{product.name}</p>
                    <p className="text-sm text-gray-500">{product.quantity} units sold</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">${product.revenue.toLocaleString()}</p>
                  <div className="w-24 bg-gray-200 rounded-full h-2 mt-1">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(product.revenue / report.topProducts[0].revenue) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Monthly Performance */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <TrendingUp className="h-5 w-5 text-emerald-600 mr-2" />
            Monthly Performance
          </h3>
          <div className="space-y-4">
            {report.monthlyData.map((month, index) => (
              <div key={month.month} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center">
                    <span className="text-emerald-600 font-semibold text-sm">{month.month}</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{month.orders} Orders</p>
                    <p className="text-sm text-gray-500">Revenue: ${month.revenue.toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <div className="w-32 bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-3 rounded-full transition-all duration-300"
                      style={{ width: `${(month.revenue / Math.max(...report.monthlyData.map(m => m.revenue))) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-500 mt-1">
                    {Math.round((month.revenue / Math.max(...report.monthlyData.map(m => m.revenue))) * 100)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Summary Card */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-xl border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Report Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
          <div>
            <p>• Revenue grew by 12.5% compared to the previous period</p>
            <p>• Order volume increased by 8.3% with consistent monthly growth</p>
            <p>• Average order value improved by 4.2%, indicating higher customer spend</p>
          </div>
          <div>
            <p>• Top 5 products account for 68% of total revenue</p>
            <p>• Consistent monthly performance with Q1 showing strong results</p>
            <p>• Customer retention and upselling strategies showing positive impact</p>
          </div>
        </div>
      </div>
    </div>
  );
};